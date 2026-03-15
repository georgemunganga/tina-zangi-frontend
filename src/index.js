import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { ErrorBoundaryProvider } from "@/providers/ErrorBoundaryProvider";
import { CommerceProvider } from "@/providers/CommerceProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundaryProvider>
      <CommerceProvider>
        <App />
      </CommerceProvider>
    </ErrorBoundaryProvider>
  </React.StrictMode>,
);
