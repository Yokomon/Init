import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { webpackCompile } from "./devBundle";
import Template from "./../template";

const app = express();
// webpackCompile(app);

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

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", (req, res) => {
  return res.status(200).send(Template());
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
