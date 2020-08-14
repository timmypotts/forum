import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Jumbotron, Card } from "reactstrap";
import AuthService from "../../../services/auth-service";
import { UserContext } from "../../../context/UserContext";

export default function PostPage({ match, location }) {
  const { user, setUser } = useContext(UserContext);
  const {
    params: { postID, postTitle },
  } = match;

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
      <Jumbotron>
        <h1 className="float-left">{postTitle}</h1>
        <br />
        <p className="float-left"></p>
      </Jumbotron>
    </Container>
  );
}
