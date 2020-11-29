import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import UserDashboard from "./components/pages/UserDashboard";
import PostPage from "./components/pages/PostPage";
import { UserContext } from "./context/UserContext";

import "./styles/App.css";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/signup" exact={true} component={Signup} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/:username/dashboard" component={UserDashboard} />
      <Route path="/postpage/:postID/:postTitle" component={PostPage} />
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
