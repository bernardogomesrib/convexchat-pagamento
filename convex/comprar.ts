import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import {  MercadoPagoConfig, Order } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-7928661767286856-052618-3e05456f2f70b5c62b890e0b776cf3ce-414722642",
  options: { timeout: 5000 },
});
export const getCompras = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("compras").collect();
  },
});

export const registrarCompra = mutation({
  args: {
    valor: v.number(),
    cardToken: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Usuário não autenticado");
    }
    const userId = identity.subject.split("|")[0] as Id<"users">;

    // Busca o usuário na tabela 'usuarios'
    const usuario = await ctx.db
      .query("usuarios")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
   
    if (!usuario) {
      throw new Error(
        "Usuário não encontrado. Cadastre-se antes de registrar compras."
      );
    }
    const comp = await ctx.db.insert("compras", {
      userId,
      valor: args.valor,
      dataCompra: Date.now(),
    });
    console.log(comp.toString());

    

    const order = new Order(client);
    const body = {
      type: "online",
      processing_mode: "automatic",
      total_amount: (args.valor * 100).toString(),
      external_reference: comp.toString(),
      payer: {
        email: usuario.email || "",
      },
      transactions: {
        payments: [
          {
            amount: (args.valor * 100).toString(),
            payment_method: {
              id: "master",
              type: "credit_card",
              token: args.cardToken,
              installments: 1,
              statement_descriptor: "Compra Convex",
            },
          },
        ],
      },
    };
    order
      .create({ body })
      .then(console.log)
      .catch((err) => {
        console.error("Erro ao criar ordem:", err);
        throw new Error("Erro ao processar pagamento");
      }
      );
      /* completionUrl: "https://dusty-toucan-865.convex.site/webhooks/abacate",
    }); */
    return { sucess: true };
    // Registra a compra
  },
});

export const atualizarStatusCompra = mutation({
  args: {
    status: v.string(),
    compraId: v.id("compras"),
  },
  handler: async (ctx, args) => {
    const compra = await ctx.db.get(args.compraId);

    if (compra) {
      await ctx.db.patch(args.compraId, { status: args.status });
      const usuario = await ctx.db
        .query("usuarios")
        .withIndex("by_user", (q) => q.eq("userId", compra.userId))
        .unique();
      if (usuario) {
        await ctx.db.patch(usuario._id, { saldo: (usuario.saldo ?? 0) + compra.valor });
      }
    }
  },
});
