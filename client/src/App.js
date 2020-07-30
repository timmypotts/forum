import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";

import "./App.css";
import { UserContext } from "./utils/UserContext";

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

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={value}>
          <NavBar />
          <Routes />
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
