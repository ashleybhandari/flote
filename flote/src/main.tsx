import { createRoot } from "react-dom/client";

import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import App from "@app/App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NextUIProvider>
      <Auth0Provider
        domain="dev-rvwwzp45gttpuq7a.us.auth0.com"
        clientId="izgea8EQWehX3fGtMY0a6hM5ByiToMRb"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <main className="light text-foreground bg-background">
          <App />
        </main>
      </Auth0Provider>
    </NextUIProvider>
  </BrowserRouter>
);
