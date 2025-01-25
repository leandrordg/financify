import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

  transactions: defineTable({
    name: v.string(), // Nome da transação
    type: v.string(), // Tipo da transação (income, expense)
    value: v.number(), // Valor da transação
    category: v.string(), // Categoria da transação (alimentação, transporte, etc.)
    paymentMethod: v.optional(v.string()), // Método de pagamento (cartão de crédito, débito, dinheiro, etc.)
    paymentParcels: v.optional(v.number()), // Quantidade de parcelas (caso a transação seja no crédito)
    transactionDate: v.number(), // Data da transação
    userId: v.id("users"), // Referência para o usuário
  }).index("by_userId", ["userId"]),
});
