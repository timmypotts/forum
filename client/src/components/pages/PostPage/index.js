import React, { useContext, useEffect, useState } from "react";
import { Container, Jumbotron, Row, Col } from "reactstrap";
import AuthService from "../../../services/auth-service";
import PostService from "../../../services/post-service";
import CommentService from "../../../services/comment-service";
import { UserContext } from "../../../context/UserContext";
import CommentForm from "./CommentForm";
import CommentCard from "../../CommentCard";

export default function PostPage({ match, location }) {
  const { user, setUser } = useContext(UserContext);
  const {
    params: { postID, postTitle },
  } = match;

  const [body, setBody] = useState("");
  const [rating, setRating] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user.username);
    } else {
      console.log("no user");
    }
  }, []);

  useEffect(() => {
    CommentService.getComments({ postID }).then((res) => {
      if (!res) {
        return null;
      }

      setComments(res);
    });
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
      <Row>
        <Jumbotron>
          <h3 className="display-5 text-left">{postTitle}</h3>

          <hr className="my-2" />

          <p className="lead text-left">{body}</p>
          <p className="text-left">{rating}</p>
        </Jumbotron>
      </Row>
      <Row className="mb-4">
        <Col>
          <CommentForm postID={{ postID }} />
        </Col>
      </Row>

      <Row>
        <Col>
          <CommentCard />
        </Col>
      </Row>
    </Container>
  );
}
