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
    PostService.loadPosts().then((res) => {
      if (!res) {
        return null;
      }
      setPosts(res);
      console.log(res);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          {user ? (
            <PostForm />
          ) : (
            <h4>
              Sign in or create an account to make a post. Don't use a password
              you normally use, I cant guarentee how secure this is. Try it out
              though!
            </h4>
          )}
        </Col>
      </Row>

      {posts.length ? (
        <div>
          {posts.map((post) => (
            <PostCard
              postID={post.id}
              title={post.postTitle}
              body={post.postBody}
              date={moment(post.createdAt).calendar()}
            />
          ))}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </Container>
  );
}
