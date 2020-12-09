import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import PostCard from "../../PostCard";
import PostForm from "./PostForm";
import moment from "moment";
import { UserContext } from "../../../context/UserContext";
import AuthService from "../../../services/auth-service";
import PostService from "../../../services/post-service";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [showBool, setShowBool] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user.username);
    } else {
      console.log("no user");
    }
  }, []);

  useEffect(() => {
    PostService.loadPosts().then((res) => {
      if (!res) {
        return null;
      }
      setPosts(res);
    });
  }, []);

  function checkUser(e) {
    if (user) {
      setShowBool(true);
    } else {
      setError("Please Sign In or Create an Account to make a post");
    }
  }

  return (
    <Container>
      <Row mb={3}>
        <Col>
          {showBool ? (
            <div>
              <PostForm mb={5} />
              <Button
                color="link"
                className="float-right"
                onClick={(e) => setShowBool(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              color="info"
              className="float-left"
              onClick={(e) => checkUser(e)}
            >
              Create a Post
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col>{error ? <p className="error-text">{error}</p> : null}</Col>
      </Row>

      {posts.length ? (
        <div>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              postID={post.id}
              title={post.postTitle}
              body={post.postBody}
              date={moment(post.createdAt).calendar()}
              author={post.User.username}
              rating={post.rating}
              image={post.image}
              comments={post.commentCount}
            />
          ))}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </Container>
  );
}
