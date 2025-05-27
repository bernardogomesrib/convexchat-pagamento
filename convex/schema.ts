import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  messages: defineTable({
    text: v.string(),
    userId: v.id("users"),
    timestamp: v.number(),
  }),
  usuarios: defineTable({
    userId: v.id("users"),
    name: v.string(),
    email: v.optional(v.string()),
    ultimaAtividade: v.number(),
    digitando: v.boolean(),
    imagem: v.optional(v.string()),
    saldo: v.optional(v.number()),
  }).index("by_user", ["userId"]),
  compras: defineTable({
    userId: v.id("users"),
    valor: v.number(),
    dataCompra: v.number(),
    status: v.optional(v.string()),
    orderId: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_orderId", ["orderId"]),
});
