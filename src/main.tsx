import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import { IncomeProvider } from "./context/IncomeContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <IncomeProvider>
            <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2500,
            }}
          />
          </IncomeProvider>
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);