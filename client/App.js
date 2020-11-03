import React from "react";
import { hot } from "react-hot-loader";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Paper style={{ height: "100vh" }}>
          <MainRouter />
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default hot(module)(App);
