import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import SignUp from "./user/SignUp";
import SignIn from "./auth/SignIn";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import EditProfile from "./user/EditProfile";

export default function MainRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      <Route path="/user/:userId" component={Profile} />
    </Switch>
  );
}
