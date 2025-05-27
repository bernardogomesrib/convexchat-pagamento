import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
export const getUsuarios = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("usuarios").collect();
  },
});
export const atualizarStatus = mutation({
  args: {
    digitando: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Usuário não autenticado");
    }
    const email = identity.email || "";
    const userId = identity.subject.split("|")[0] as Id<"users">;

    // Procura o registro do usuário
    const usuario = await ctx.db
      .query("usuarios")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    const user = await ctx.db.get(userId);
    if (!usuario) {
      // Se não existir, cria um novo
      
      return await ctx.db.insert("usuarios", {
        userId,
        name:  user?.name?? "Anônimo",
        ultimaAtividade: Date.now(),
        digitando: args.digitando,
        email: email,
        imagem: user?.image,
        saldo: 0,
      });
    }

    // Se existir, atualiza
    return await ctx.db.patch(usuario._id, {
      ultimaAtividade: Date.now(),
      digitando: args.digitando,
      name: user?.name?? "Anônimo",
      imagem: user?.image,
      email: email,
    });
  },
});
export const getUsuarioViaId= query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const usuario = await ctx.db
      .query("usuarios")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();
    return usuario;
  },
})