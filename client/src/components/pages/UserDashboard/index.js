import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import DashPostCard from "../../DashPostCard";
import moment from "moment";
import { UserContext } from "../../../context/UserContext";
import AuthService from "../../../services/auth-service";
import PostService from "../../../services/post-service";

export default function UserDashboard({match, location}) {
  const { user, setUser } = useContext(UserContext);
  const {
    params : {username},
  } = match;
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
    PostService.getPostsFromUser().then((res) => {
      if(!res) {
        return null;
      }
      setPosts(res.data);
      console.log(res);
    });
  }, [])

  return (
    <Container>
      <Row>
        <h1 className="float-left">Hello {user}</h1>
      </Row>
      <Row><h4>Post History:</h4></Row>

      {posts.length ? (
        <div>
          {posts.map((post) => (
            <DashPostCard
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
