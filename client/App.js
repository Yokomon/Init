import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";

const App = () => {
  useEffect(() => {
    const jss = document.getElementById("jss-server-side");
    if (jss) {
      jss.parentNode.removeChild(jss);
    }
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default hot(module)(App);
