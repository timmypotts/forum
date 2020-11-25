import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import AuthService from "../../../services/auth-service";
import PostService from "../../../services/post-service";
import CommentService from "../../../services/comment-service";
import { UserContext } from "../../../context/UserContext";
import CommentForm from "./CommentForm";
import CommentCard from "../../CommentCard";
import PostCard from "../../PostCard";
import moment from "moment";

export default function PostPage({ match, location }) {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const {
    params: { postID, postTitle },
  } = match;

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user.username);
    } else {
      console.log("no user");
    }
  }, []);

  useEffect(() => {
    getPost({ postID });
    loadComments({ postID });
  }, []);

  async function getPost(id) {
    let response = await PostService.getPost(id);
    if (!response) {
      console.log("Error loading post!");
    }
    setPost(response.data);
  }

  async function loadComments(id) {
    let response = await CommentService.getComments(id);
    if (!response) {
      console.log("Error loading post!");
      return null;
    }
    setComments(response);
  }

  return (
    <Container>
      <Row>
        <Col>
          {post.User ? (
            <PostCard
              postID={post.id}
              key={post.id}
              title={post.postTitle}
              body={post.postBody}
              date={moment(post.createdAt).calendar()}
              author={post.User.username}
              rating={post.rating}
            />
          ) : null}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <CommentForm postID={{ postID }} />
        </Col>
      </Row>

      <Row>
        <Col>
          {comments.length ? (
            <div>
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  commentID={comment.id}
                  commentText={comment.comment}
                  author={comment.username}
                  rating={comment.rating}
                />
              ))}
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
