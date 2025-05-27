import { httpActionGeneric } from "convex/server";
import { auth } from "./auth";
import router from "./router";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

/* {

  action: "payment.updated",
  api_version: "v1",
  data: {"id":"kh79vzegxp7dfh2445p5nj1p6d7gm7sw"},
  date_created: "2021-11-01T02:02:02Z",
  id: "123456",
  live_mode: false,
  type: "payment",
  user_id: 414722642

} */

const http = router;
/* interface Pagamento {
  action: string;
  api_version: string;
  data: {
    id: string;
  };
  date_created: string;
  id: string;
  live_mode: boolean;
  type: string;
  user_id: number;
} */
http.route({
  path: "/webhooks/abacate",
  method: "POST",
  handler: httpActionGeneric(async (ctx, request) => {
    const url = new URL(request.url);

    const xSignature = request.headers.get("x-signature") || ""; 
    const xRequestId = request.headers.get("x-request-id") || "";

    const body = await request.text(); 

    console.log("Webhook URL:", );
    const dataID = url.searchParams.get("data.id") || "";
    const isValid = await ctx.runAction(api.decript.validarAssinatura, {
      xSignature,
      xRequestId,
      dataID,
    });

    if (!isValid) {
      return new Response("Unauthorized", { status: 401 });
    }

    await ctx.runMutation(api.comprar.atualizarStatusCompra,{
      compraId: dataID as Id<"compras">,
      status: "PAGO"
    })

    console.log("Webhook recebido:", body);
    return new Response("Webhook received", { status: 200 });
  }),
});

auth.addHttpRoutes(http);

export default http;
