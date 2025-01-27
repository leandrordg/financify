import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

  transactions: defineTable({
    name: v.string(),
    type: v.string(),
    value: v.number(),
    paymentMethod: v.optional(v.string()),
    paymentParcels: v.optional(v.number()),
    transactionDate: v.number(),
    tokenIdentifier: v.string(),
    categoryId: v.id("categories"),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_category_id", ["categoryId"]),

  categories: defineTable({
    name: v.string(),
    type: v.string(),
    tokenIdentifier: v.string(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_name", ["name"]),
});
