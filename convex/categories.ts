import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("Usuário não autenticado");

    const categories = await ctx.db
      .query("categories")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .collect();

    const incomeCategories = categories
      .filter((category) => category.type === "income")
      .sort((a, b) => a.name.localeCompare(b.name));

    const expenseCategories = categories
      .filter((category) => category.type === "expense")
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      categories,
      incomeCategories,
      expenseCategories,
    };
  },
});

export const getById = query({
  args: {
    categoryId: v.id("categories"),
  },
  handler: async (ctx, { categoryId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("Usuário não autenticado");

    const category = await ctx.db.get(categoryId);

    if (!category) throw new ConvexError("Categoria não encontrada");

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_category_id", (q) => q.eq("categoryId", categoryId))
      .collect();

    return {
      category,
      transactions,
    };
  },
});

export const create = mutation({
  args: {
    categories: v.array(
      v.object({
        name: v.string(),
        type: v.string(),
      })
    ),
  },
  handler: async (ctx, { categories }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("Usuário não autenticado");

    const categoryNames = categories.map((category) => category.name);

    const existingCategories = await ctx.db
      .query("categories")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .collect();

    // check if category already exists
    const duplicateCategory = existingCategories.find((category) => {
      return categoryNames.includes(category.name);
    });

    if (duplicateCategory)
      throw new ConvexError(`Categoria ${duplicateCategory.name} já existe`);

    // create new categories
    const newCategories = categories.map((category) => ({
      ...category,
      tokenIdentifier: identity.tokenIdentifier,
    }));

    // insert new categories
    for (const category of newCategories) {
      await ctx.db.insert("categories", category);
    }
  },
});
