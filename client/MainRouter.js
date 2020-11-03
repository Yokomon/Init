import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import SignUp from "./user/SignUp";
import SignIn from "./auth/SignIn";
import Profile from "./user/Profile";

export default function MainRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/user/:userId" component={Profile} />
    </Switch>
  );
}
