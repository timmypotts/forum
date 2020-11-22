import React, { useContext, useEffect, useState } from "react";
import { Container, Jumbotron } from "reactstrap";
import AuthService from "../../../services/auth-service";
import PostService from "../../../services/post-service";
import { UserContext } from "../../../context/UserContext";
import CommentForm from "./CommentForm";

export default function PostPage({ match, location }) {
  const { user, setUser } = useContext(UserContext);
  const {
    params: { postID, postTitle },
  } = match;

  const [body, setBody] = useState("");
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user.username);
    } else {
      console.log("no user");
    }
  }, []);

  async function getBody() {
    let response = await PostService.getPost({ postID });
    if (!response) {
      setBody("Error loading post!");
    }
    setRating(response.data.rating);
    setBody(response.data.postBody);
  }

  getBody();

  return (
    <Container>
      <Jumbotron>
        <h3 className="display-5 text-left">{postTitle}</h3>

        <hr className="my-2" />

        <p className="lead text-left">{body}</p>
        <p className="text-left">{rating}</p>
      </Jumbotron>
      <CommentForm />
    </Container>
  );
}
