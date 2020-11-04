import express from "express";
import userCtrl from "./../controllers/user.controller";
import authCtrl from "./../controllers/auth.controller";

const Router = express.Router();

Router.route("/api/users").post(userCtrl.create).get(userCtrl.list);
Router.route("/api/user/:userId/profilepicture").get(
  userCtrl.getProfilePicture
);
Router.route("/api/user/:userId")
  .get(authCtrl.requireSignIn, userCtrl.read)
  .put(authCtrl.requireSignIn, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignIn, authCtrl.hasAuthorization, userCtrl.remove);

Router.param("userId", userCtrl.getUserId);

export default Router;
