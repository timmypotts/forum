import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import PostForm from "./PostForm";
import CheckUser from "../../../context/CheckUser";
import { UserContext } from "../../../context/UserContext";
import AuthService from "../../../services/auth-service";
export default function Home() {
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

  return (
    <Container>
      <Row>
        <Col>{user ? <PostForm /> : null}</Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
}
