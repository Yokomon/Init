import express from "express";
import authCtrl from "./../controllers/auth.controller";

const Router = express.Router();

Router.route("/auth/signin").post(authCtrl.signin);
Router.route("/auth/signout").get(authCtrl.signout);

export default Router;
