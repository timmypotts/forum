import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron, Card } from "reactstrap";
import AuthService from "../../../services/auth-service";
import PostService from "../../../services/post-service";
import { UserContext } from "../../../context/UserContext";

export default function PostPage({ match, location }) {
  const { user, setUser } = useContext(UserContext);
  const {
    params: { postID, postTitle },
  } = match;

  const [body, setBody] = useState("");


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      console.log(user);
      setUser(user.username);
    } else {
      console.log("no user");
    }
  }, []);

  useEffect(() => {
    PostService.getPost({postID}).then((res) => {
      console.log(res);
      if (!res) {
        setBody("Error loading post!");
      }
      setBody(res);
      console.log(body.postBody);
    });
  }, []);


  return (
    <Container>
      <Jumbotron>

        <h1 className="display-3">{postTitle}</h1>
        <hr className="my-2" />
        <p className="lead">{body}</p>

      </Jumbotron>
      </Container>

  );
}
