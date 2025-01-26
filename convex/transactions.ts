import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("Usuário não autenticado");

    return await ctx.db
      .query("transactions")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .collect();
  },
});

export const getLastTransactions = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { limit }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("Usuário não autenticado");

    return await ctx.db
      .query("transactions")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .order("desc")
      .take(limit ?? 5);
  },
});

export const getTransactionsByMonths = query({
  args: {
    months: v.number(),
  },
  handler: async (ctx, { months }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("Usuário não autenticado");

    const now = new Date();
    const lastMonths = new Date(
      now.getFullYear(),
      now.getMonth() - months + 1,
      1
    ); // Início do mês correspondente

    // get all transactions from the last months
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .filter((q) => q.gte(q.field("transactionDate"), lastMonths.getTime()))
      .collect();

    // obtain month names
    const monthNames = Array.from({ length: months }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return date.toLocaleString("default", { month: "long" });
    }).reverse(); // Reverse the array to show the most recent month first

    // Group transactions by month
    const groupedTransactions = transactions.reduce(
      (
        acc: {
          [key: string]: {
            expenses: Doc<"transactions">[];
            incomes: Doc<"transactions">[];
          };
        },
        transaction
      ) => {
        const date = new Date(transaction.transactionDate);
        const month = date.toLocaleString("default", { month: "long" });

        if (!acc[month]) {
          acc[month] = { expenses: [], incomes: [] };
        }

        if (transaction.type === "expense") {
          acc[month].expenses.push(transaction);
        } else {
          acc[month].incomes.push(transaction);
        }

        return acc;
      },
      {}
    );

    // grant that all months are present in the result
    const result = monthNames.map((month) => ({
      month,
      expenses: groupedTransactions[month]?.expenses || [],
      incomes: groupedTransactions[month]?.incomes || [],
    }));

    return result;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    value: v.string(),
    category: v.string(),
    paymentMethod: v.optional(v.string()),
    paymentParcels: v.optional(v.string()),
    transactionDate: v.number(),
  },
  handler: async (
    ctx,
    {
      name,
      type,
      value,
      category,
      paymentMethod,
      paymentParcels,
      transactionDate,
    }
  ) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("Usuário não autenticado");

    // check if payment is credit and if paymentParcels is set
    // thats because if user set to credit, change the parcels and after back to cash or any other payment method, the parcels will still set
    const isCredit = !!(paymentMethod === "credit" && paymentParcels);

    // Check if user already exists in the database
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    // If user does not exist in the db, create a new one and a new transaction
    if (!user) {
      const newUser = await ctx.db.insert("users", {
        name: identity.name ?? "Anônimo",
        email: identity.email ?? "N/A",
        tokenIdentifier: identity.tokenIdentifier,
      });

      return await ctx.db.insert("transactions", {
        name,
        type,
        value: parseFloat(value),
        category,
        paymentMethod,
        paymentParcels: isCredit ? parseFloat(paymentParcels) : undefined,
        transactionDate,
        tokenIdentifier: identity.tokenIdentifier,
      });
    }

    // If user exists in db, create a new transaction
    return await ctx.db.insert("transactions", {
      name,
      type,
      value: parseFloat(value),
      category,
      paymentMethod,
      paymentParcels: isCredit ? parseFloat(paymentParcels) : undefined,
      transactionDate,
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});
