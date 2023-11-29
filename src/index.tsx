import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ToastService from "./components/toast/toast.component";

const theme = createTheme({
  palette: {
    primary: {
      main: "#77BC3F", // replace with your desired color
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
        <ToastService.MyToastContainer />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
