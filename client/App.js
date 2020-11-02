import React from "react";
import { hot } from "react-hot-loader";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import theme from './theme'
import ThemeProvider from "@material-ui/styles/ThemeProvider";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default hot(module)(App);
