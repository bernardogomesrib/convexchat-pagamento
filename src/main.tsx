import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';

import "./index.css";
import App from "./App";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const initialOptions: ReactPayPalScriptOptions = {
  clientId: "AUJszso6EKQ1W821ilHjIL6U97AUP28LF07gJcS3RHjb7pmvgpbeb6gxmxyk-tPpnsk8EDyXhlSJSuI9",
  currency: "BRL",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <PayPalScriptProvider options={initialOptions}>
      <App />
      </PayPalScriptProvider>
    </ConvexAuthProvider>
  </StrictMode>,
);
