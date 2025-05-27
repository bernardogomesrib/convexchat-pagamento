import { Id } from "../convex/_generated/dataModel";
export type User = {
  _id: Id<"users">;
  _creationTime: number;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  image?: string | undefined;
  emailVerificationTime?: number | undefined;
  phoneVerificationTime?: number | undefined;
  isAnonymous?: boolean | undefined;
};
export type Usuario = {
  userId: Id<"users">;
  name: string;
  ultimaAtividade: number;
  digitando: boolean;
  imagem?: string | undefined;
  saldo?: number | undefined;
};
export type Mensagem = {
  text: string;
  userId: Id<"users">;
  timestamp: number;
};
export const euToUsuario = (user:User|null)=>{
    if(null === user){
        return null;
    }
    return {
        userId: user._id,
        name: user.name || "",
        ultimaAtividade: Date.now(),
        digitando: false,
        imagem: user.image || undefined,
        saldo: 0, // Inicialmente, o saldo é 0, pode ser atualizado posteriormente
    };
}