import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { ErrorBoundaryProvider } from "@/providers/ErrorBoundaryProvider";
import { CommerceProvider } from "@/providers/CommerceProvider";
import { AuthProvider } from "@/providers/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundaryProvider>
      <AuthProvider>
        <CommerceProvider>
          <App />
        </CommerceProvider>
      </AuthProvider>
    </ErrorBoundaryProvider>
  </React.StrictMode>,
);
