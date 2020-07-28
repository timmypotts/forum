import React, { useState, useEffect, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthAPI from "./utils/AuthAPI";

import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Secret from "./components/pages/Secret";

import "./App.css";

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

const Routes = () => {
  const Auth = React.useContext(AuthAPI);
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/signup" exact={true} component={Signup} />
      <Route path="/login" exact={true} component={Login} />
      <ProtectedRoute path="/secret" auth={Auth.auth} component={Secret} />
    </Switch>
  );
};

function App() {
  const [auth, setAuth] = React.useState(false);

  return (
    <AuthAPI.Provider value={{ auth, setAuth }}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes />
        </div>
      </Router>
    </AuthAPI.Provider>
  );
}

export default App;
