import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { CookiesProvider } from "react-cookie";
import { ChakraProvider } from "@chakra-ui/react";
import { StoreProvider } from "./context/Store";

import theme from "./utils/theme";

import "@fontsource/arsenal/400.css";
import "@fontsource/bree-serif/400.css";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
