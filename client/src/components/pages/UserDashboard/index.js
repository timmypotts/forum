import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import DashPostCard from "../../DashPostCard";
import DashCommentCard from "../../DashCommentCard";
import moment from "moment";
import { UserContext } from "../../../context/UserContext";
import AuthService from "../../../services/auth-service";
import PostService from "../../../services/post-service";
import CommentService from "../../../services/comment-service";

export default function UserDashboard({ match, location }) {
  const { user, setUser } = useContext(UserContext);
  const {
    params: { username },
  } = match;
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [grab, setGrab] = useState("Post");

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
    if (grab === "Comment") {
      CommentService.getCommentsFromCurrentUser().then((res) => {
        if (!res) {
          return null;
        }
        setComments(res.data);
        console.log(res);
      });
    } else {
      PostService.getPostsFromCurrentUser().then((res) => {
        if (!res) {
          return null;
        }
        setPosts(res.data);
        console.log(res);
      });
    }
  }, [grab]);

  // This function is called when the user has selected posts to be loaded
  function renderPosts() {
    return posts.length ? (
      <div>
        {posts.map((post) => (
          <DashPostCard
            key={post.id}
            postID={post.id}
            title={post.postTitle}
            body={post.postBody}
            date={moment(post.createdAt).calendar()}
            rating={post.rating}
            image={post.image}
          />
        ))}
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }

  // This function is called when the user has selected comments to be loaded
  function renderComments() {
    return comments.length ? (
      <div>
        {comments.map((comment) => (
          <DashCommentCard
            key={comment.id}
            commentID={comment.id}
            commentText={comment.comment}
            author={comment.username}
            rating={comment.rating}
          />
        ))}
      </div>
    ) : null;
  }

  return (
    <Container>
      <Row>
        <h1 className="float-left">Hello {user}</h1>
      </Row>
      <Row>
        <ButtonGroup className="float-right pb-2">
          <Button
            disabled={grab === "Post"}
            onClick={() => setGrab("Post")}
            className="float-right"
          >
            Posts
          </Button>
          <Button
            disabled={grab === "Comment"}
            onClick={() => setGrab("Comment")}
            className="float-right"
          >
            Comments
          </Button>
        </ButtonGroup>
      </Row>

      <Row>
        <h4>{grab} History:</h4>
      </Row>
      <div>{grab === "Post" ? renderPosts() : renderComments()}</div>
    </Container>
  );
}
