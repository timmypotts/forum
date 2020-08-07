import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth-service";

export default function CheckUser() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      console.log(user);
      setUser(user.username);
    } else {
      console.log("no user");
    }
  });

  return <div>{user ? <Redirect to="/" /> : null}</div>;
}
