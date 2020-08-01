import React, { useContext } from "react";
import { UserContext } from "../services/auth-service";
import { Redirect } from "react-router-dom";

export default function CheckUser() {
  const { user, setUser } = useContext(UserContext);
  return <div>{user ? <Redirect to="/" /> : null}</div>;
}
