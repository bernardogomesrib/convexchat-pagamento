"use node";
import { action } from "./_generated/server";
import crypto from "crypto";
import { v } from "convex/values";

const secret =
  "961b8dff2253bfab5bd6b2589c74c7de056a3c77544b3186174c86566df91219";

export const validarAssinatura = action({
  args: {
    xSignature: v.string(),
    xRequestId: v.string(),
    dataID: v.string(),
  },
  handler: async (ctx, args) => {
    return valida(args.xSignature,args.xRequestId, args.dataID);
  },
});



function valida(xSignature:string, xRequestId:string, dataID:string) {
  const parts = xSignature.split(",");

  let ts;
  let hash;

  parts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === "ts") {
        ts = trimmedValue;
      } else if (trimmedKey === "v1") {
        hash = trimmedValue;
      }
    }
  });

  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(manifest);

  const sha = hmac.digest("hex");

  if (sha === hash) {
    console.log("HMAC verification passed");
    return true
  } else {
    console.log("HMAC verification failed");
    return false
  }
}



