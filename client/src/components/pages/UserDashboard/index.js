import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import PostCard from "../../PostCard";
import moment from "moment";
import { UserContext } from "../../../context/UserContext";
import AuthService from "../../../services/auth-service";
import PostService from "../../../services/post-service";

export default function UserDashboard() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      console.log(user);
      setUser(user.username);
    } else {
      console.log("no user");
    }
  }, []);

  return (
    <Container>
      <Row>
        <h1 className="float-left">Hello {user}</h1>
      </Row>
      <Row>
        <PostCard />
      </Row>
    </Container>
  );
}
