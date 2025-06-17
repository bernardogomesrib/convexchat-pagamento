import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const getCompras = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("compras").collect();
  },
});

export const registrarCompra = mutation({
  args: {
    valor: v.number(),
    orderId: v.string(),
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
      orderId: args.orderId,
      status: "PENDENTE", // Status inicial da compra
    });
    console.log(comp.toString());

    

   
      /* completionUrl: "https://dusty-toucan-865.convex.site/webhooks/abacate",
    }); */
    return comp;
    // Registra a compra
  },
});

export const atualizarStatusCompra = mutation({
  args: {
    status: v.string(),
    orderId: v.string(),
  },
  handler: async (ctx, args) => {
    const compra = await ctx.db
      .query("compras")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .unique();

    if (compra) {
      await ctx.db.patch(compra._id, { status: args.status });
      if( args.status === "COMPLETED") {
        const usuario = await ctx.db
          .query("usuarios")
          .withIndex("by_user", (q) => q.eq("userId", compra.userId))
          .unique();
        if (usuario) {
          await ctx.db.patch(usuario._id, {
            saldo: (usuario.saldo ?? 0) + compra.valor,
          });
        }
      }
    }
  },
});
