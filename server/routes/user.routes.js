import express from "express";
import userCtrl from "./../controllers/user.controller";

const Router = express.Router();

Router.route("/api/users").post(userCtrl.create).get(userCtrl.list);
Router.route("/api/user/:userId")
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

export default Router;
