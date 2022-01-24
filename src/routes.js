import React from "react";
import { Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ViewData from "./containers/ViewData";

export default (
  <Switch>
    <PrivateRoute exact path="/home" component={Home} />
    <PrivateRoute exact path="/records" component={ViewData} />
    <PrivateRoute exact path="/" isLoginRegister={true} component={Login} />
    <PrivateRoute exact path="/sign-up" isLoginRegister={true} component={Register} />
    <Redirect to="/not-found" component={Home} />
  </Switch>
);
