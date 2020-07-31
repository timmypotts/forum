import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import AuthService from "./services/auth-service";

import "./App.css";
import { UserContext } from "./context/UserContext";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/signup" exact={true} component={Signup} />
      <Route path="/login" exact={true} component={Login} />
    </Switch>
  );
};

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
