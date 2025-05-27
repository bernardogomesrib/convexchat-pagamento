import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query("messages").order("desc").take(50)).reverse();
  },
});

export const sendMessages = mutation({
  args: {
    text: v.string(),
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
      return { error: "Usuário não encontrado. Cadastre-se antes de enviar mensagens." };
    }

    if ((usuario.saldo ?? 0) <= 0) {
      return {
        error: "Saldo insuficiente. Adicione saldo para enviar mensagens.",
      };
    }

    // Opcional: descontar 1 de saldo a cada mensagem enviada
    await ctx.db.patch(usuario._id, { saldo: (usuario.saldo ?? 0) - 1 });

    await ctx.db.insert("messages", {
      text: args.text,
      userId,
      timestamp: Date.now(),
    });
  },
});


