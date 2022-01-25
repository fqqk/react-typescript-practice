import React from "react";
import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { Router } from "./router/router";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
}
