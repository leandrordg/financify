import { ConvexError, v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

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

export const getById = query({
  args: {
    transactionId: v.id("transactions"),
  },
  handler: async (ctx, { transactionId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("Usuário não autenticado");

    const transaction = await ctx.db.get(transactionId);
    if (!transaction) throw new ConvexError("Transação não encontrada");

    const category = await ctx.db.get(transaction.categoryId);
    if (!category) throw new ConvexError("Categoria não encontrada");

    return {
      ...transaction,
      category,
    };
  },
});

export const getLast = query({
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

export const getByMonths = query({
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
    );

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
    }).reverse(); // reverse the array to show the most recent month first

    // group transactions by month
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

        // create month if it does not exist
        if (!acc[month]) {
          acc[month] = { expenses: [], incomes: [] };
        }

        // add transaction to the respective type
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

export const getByMonth = query({
  args: {
    month: v.number(),
  },
  handler: async (ctx, { month }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("Usuário não autenticado");

    const now = new Date();
    const specificMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - (month - 1),
      1
    );
    const specificMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth() - (month - 2),
      1
    );

    // return only transactions for the selected month
    return await ctx.db
      .query("transactions")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .filter((q) =>
        q.and(
          q.gte(q.field("transactionDate"), specificMonthStart.getTime()),
          q.lt(q.field("transactionDate"), specificMonthEnd.getTime())
        )
      )
      .collect();
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
    paymentParcelsWithInterest: v.optional(v.string()),
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
      paymentParcelsWithInterest,
      transactionDate,
    }
  ) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("Usuário não autenticado");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      await ctx.db.insert("users", {
        name: identity.name ?? "Anônimo",
        email: identity.email ?? "N/A",
        tokenIdentifier: identity.tokenIdentifier,
      });
    }

    return await ctx.db.insert("transactions", {
      name,
      type,
      paymentMethod,
      transactionDate,
      value: parseFloat(value), // convert value to number
      paymentParcels:
        paymentMethod === "card" ? parseInt(paymentParcels ?? "0") : undefined,
      paymentParcelsWithInterest:
        paymentMethod === "card" ? paymentParcelsWithInterest : undefined,
      tokenIdentifier: identity.tokenIdentifier,
      categoryId: category as Id<"categories">,
    });
  },
});
