import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes";

import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import AgeConfirmationModal from "./components/AgeConfirmationModal";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppRouter />
      <ToastContainer autoClose={3500} position="bottom-right" />
      <AgeConfirmationModal />
    </ThemeProvider>
  </React.StrictMode>
);
