import { httpActionGeneric } from "convex/server";
import { auth } from "./auth";
import router from "./router";
 import { api } from "./_generated/api";

/* {
{
  "id": "WH-4LG98374Y9043482N-0ER785741M516843K",
  "event_version": "1.0",
  "create_time": "2025-05-27T18:12:02.443Z",
  "resource_type": "checkout-order",
  "resource_version": "2.0",
  "event_type": "CHECKOUT.ORDER.APPROVED",
  "summary": "An order has been approved by buyer",
  "resource": {
    "update_time": "2025-05-27T18:11:57Z",
    "create_time": "2025-05-27T18:11:43Z",
    "purchase_units": [
      {
        "reference_id": "default",
        "amount": { "currency_code": "BRL", "value": "10.00" },
        "payee": {
          "email_address": "sb-0gvcc42963740@business.example.com",
          "merchant_id": "WD8C22JY6F2QW"
        },
        "description": "Compra de créditos",
        "soft_descriptor": "TEST STORE",
        "shipping": {
          "name": { "full_name": "John Doe" },
          "address": {
            "address_line_1": "1234 Rua Main",
            "admin_area_2": "Rio De Janeiro",
            "admin_area_1": "RJ",
            "postal_code": "22021-001",
            "country_code": "BR"
          }
        },
        "payments": {
          "captures": [
            {
              "id": "6XC459040S826315S",
              "status": "COMPLETED",
              "amount": { "currency_code": "BRL", "value": "10.00" },
              "final_capture": true,
              "seller_protection": {
                "status": "ELIGIBLE",
                "dispute_categories": [
                  "ITEM_NOT_RECEIVED",
                  "UNAUTHORIZED_TRANSACTION"
                ]
              },
              "seller_receivable_breakdown": {
                "gross_amount": { "currency_code": "BRL", "value": "10.00" },
                "paypal_fee": { "currency_code": "BRL", "value": "0.74" },
                "net_amount": { "currency_code": "BRL", "value": "9.26" }
              },
              "links": [
                {
                  "href": "https://api.sandbox.paypal.com/v2/payments/captures/6XC459040S826315S",
                  "rel": "self",
                  "method": "GET"
                },
                {
                  "href": "https://api.sandbox.paypal.com/v2/payments/captures/6XC459040S826315S/refund",
                  "rel": "refund",
                  "method": "POST"
                },
                {
                  "href": "https://api.sandbox.paypal.com/v2/checkout/orders/6WL92139PJ904505J",
                  "rel": "up",
                  "method": "GET"
                }
              ],
              "create_time": "2025-05-27T18:11:57Z",
              "update_time": "2025-05-27T18:11:57Z"
            }
          ]
        }
      }
    ],
    "links": [
      {
        "href": "https://api.sandbox.paypal.com/v2/checkout/orders/6WL92139PJ904505J",
        "rel": "self",
        "method": "GET"
      }
    ],
    "id": "6WL92139PJ904505J",
    "payment_source": {
      "paypal": {
        "email_address": "sb-ujls540857522@personal.example.com",
        "account_id": "A3CPAQ52EMJKW",
        "account_status": "VERIFIED",
        "name": { "given_name": "John", "surname": "Doe" },
        "tax_info": { "tax_id": "30949017787", "tax_id_type": "BR_CPF" },
        "address": { "country_code": "BR" }
      }
    },
    "intent": "CAPTURE",
    "payer": {
      "name": { "given_name": "John", "surname": "Doe" },
      "email_address": "sb-ujls540857522@personal.example.com",
      "payer_id": "A3CPAQ52EMJKW",
      "address": { "country_code": "BR" }
    },
    "status": "COMPLETED"
  },
  "links": [
    {
      "href": "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-4LG98374Y9043482N-0ER785741M516843K",
      "rel": "self",
      "method": "GET"
    },
    {
      "href": "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-4LG98374Y9043482N-0ER785741M516843K/resend",
      "rel": "resend",
      "method": "POST"
    }
  ]
}

} */
export type PagamentoWebhook = {
  id: string;
  event_version: string;
  create_time: string;
  resource_type: string;
  resource_version: string;
  event_type: string;
  summary: string;
  resource: {
    update_time: string;
    create_time: string;
    purchase_units: Array<{
      reference_id: string;
      amount: { currency_code: string; value: string };
      payee: { email_address: string; merchant_id: string };
      description: string;
      soft_descriptor: string;
      shipping: {
        name: { full_name: string };
        address: {
          address_line_1: string;
          admin_area_2: string;
          admin_area_1: string;
          postal_code: string;
          country_code: string;
        };
      };
      payments: {
        captures: Array<{
          id: string;
          status: string;
          amount: { currency_code: string; value: string };
          final_capture: boolean;
          seller_protection: {
            status: string;
            dispute_categories: string[];
          };
          seller_receivable_breakdown: {
            gross_amount: { currency_code: string; value: string };
            paypal_fee: { currency_code: string; value: string };
            net_amount: { currency_code: string; value: string };
          };
          links: Array<{
            href: string;
            rel: string;
            method: string;
          }>;
          create_time: string;
          update_time: string;
        }>;
      };
    }>;
    links: Array<{
      href: string;
      rel: string;
      method: string;
    }>;
    id: string;
    payment_source: {
      paypal: {
        email_address: string;
        account_id: string;
        account_status: string;
        name: { given_name: string; surname: string };
        tax_info: { tax_id: string; tax_id_type: string };
        address: { country_code: string };
      };
    };
    intent: string;
    payer: {
      name: { given_name: string; surname: string };
      email_address: string;
      payer_id: string;
      address: { country_code: string };
    };
    status: string;
  };
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
};

const http = router;

http.route({
  path: "/webhooks/abacate",
  method: "POST",
  handler: httpActionGeneric(async (ctx, request: Request) => {
    const url = new URL(request.url);

    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });
    const rawBody = await request.text();
    console.log("url:", url);

    const transmissionId = headers["paypal-transmission-id"];
    const timeStamp = headers["paypal-transmission-time"];
    const certUrl = headers["paypal-cert-url"];
    const transmissionSig = headers["paypal-transmission-sig"];

    console.log("transmissionId:", transmissionId);
    console.log("timeStamp:", timeStamp);
    console.log("certUrl:", certUrl);
    console.log("transmissionSig:", transmissionSig);

    let webhookBody: PagamentoWebhook | undefined;
    try {
      webhookBody = await JSON.parse(rawBody) as PagamentoWebhook;
      if (webhookBody?.resource?.id) {
        await ctx.runMutation(api.comprar.atualizarStatusCompra, {
          orderId: webhookBody.resource.id,
          status: webhookBody.resource.status,
        });
      }
    } catch (e) {
      console.error("Failed to parse webhook body", e);
      return new Response("Invalid JSON", { status: 400 });
    }

    
    /* const isValid = await ctx.runAction(api.decript.validarAssinaturaPaypal, {
      transmissionId,
      timeStamp,
      certUrl,
      transmissionSig,
      rawBody,
    }); */
    /* console.log("Assinatura válida:", isValid); */
    /*  if (!isValid) {
      return new Response("Unauthorized", { status: 401 });
    } */

    /* await ctx.runMutation(api.comprar.atualizarStatusCompra,{
      compraId: webhookBody.resource?.id as Id<"compras">,
      status: "PAGO"
    }) */
    console.log("Webhook recebido:", rawBody);
    return new Response("Webhook received", { status: 200 });
  }),
});

auth.addHttpRoutes(http);

export default http;
