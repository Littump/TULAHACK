import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {YMapComponentsProvider} from "ymap3-components";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <YMapComponentsProvider apiKey={"4b2e38aa-c9fd-4138-aab0-fe2455374d9c"}>
            <App />
        </YMapComponentsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
