"use node";
import { action } from "./_generated/server";
import crypto from "crypto";
import { v } from "convex/values";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const crc32 = require("buffer-crc32");

const WEBHOOK_ID = "1HJ85771JV089142S";

export const validarAssinaturaPaypal = action({
  args: {
    transmissionId: v.string(),
    timeStamp: v.string(),
    certUrl: v.string(),
    transmissionSig: v.string(),
    rawBody: v.string(),
  },
  handler: async (ctx, args) => {
    // Calcula o CRC32 do corpo cru em decimal, igual ao exemplo do PayPal
    const crc = parseInt("0x" + crc32(args.rawBody).toString("hex"));
    // Monta a mensagem original
    const message = `${args.transmissionId}|${args.timeStamp}|${WEBHOOK_ID}|${crc}`;
    // Baixa o certificado PEM do PayPal
    const certPem = await fetch(args.certUrl).then((r) => r.text());
    // Decodifica a assinatura base64
    const signatureBuffer = Buffer.from(args.transmissionSig, "base64");
    // Cria o verificador
    const verifier = crypto.createVerify("SHA256");
    verifier.update(message);
    // Verifica a assinatura
    return verifier.verify(certPem, signatureBuffer);
  },
});