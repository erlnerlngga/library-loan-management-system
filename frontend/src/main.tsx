import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "./state/redux.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
        <Toaster />
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>
);
