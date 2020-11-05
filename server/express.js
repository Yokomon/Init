import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { webpackCompile } from "./devBundle";
import Template from "./../template";
const path = require("path");
const CWD = process.cwd();

const app = express();
// webpackCompile(app);

// Server-side rendering
import React from "react";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import MainRouter from "./../client/MainRouter";
import theme from "./../client/theme";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);
app.use(compression());

app.use("/dist", express.static(path.join(CWD, "dist")));
app.use("/", userRoutes);
app.use("/", authRoutes);
app.get("*", (req, res) => {
  const context = {};
  const sheets = new ServerStyleSheets();
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  return res.status(200).send(
    Template({
      markup: markup,
      css: css,
    })
  );
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: `${err.name}: ${err.message}`,
    });
  } else {
    return res.status(400).json({
      error: `${err.name}: ${err.message}`,
    });
  }
});

export default app;
