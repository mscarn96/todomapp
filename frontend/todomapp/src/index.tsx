import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { StoreProvider } from "./components/context/Store";

import theme from "./utils/theme";

import "@fontsource/arsenal/400.css";
import "@fontsource/bree-serif/400.css";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
