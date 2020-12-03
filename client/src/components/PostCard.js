import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PostWrapper } from "../styles/index";
import LikeService from "../services/like-service";
import notLiked from "./img/not-liked.png";
import likedicon from "./img/liked.png";

import {
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Row,
  Button,
} from "reactstrap";

const PostCard = (props) => {
  const IMG_URL = "http://www.timpotts.xyz:3080/";
  const [rating, setRating] = useState(props.rating);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState("");

  async function likePost() {
    if (JSON.parse(localStorage.getItem("user")) == null) {
      setError("Please sign in to like a post");
      return;
    }
    setLiked(true);
    let newRating = await LikeService.likePost(props.postID);
    console.log(newRating);
    setRating(newRating);
  }

  async function unlikePost() {
    setLiked(false);
    let newRating = await LikeService.unlikePost(props.postID);
    console.log(newRating);
    setRating(newRating);
  }

  return (
    <PostWrapper>
      <Row className="mt-3 mb-3">
        <Col>
          <Card>
            <CardHeader className="mb-0">
              <Link to={`/postpage/${props.postID}/${props.title}/`}>
                <Row>
                  <h3 className="float-left">{props.title}</h3>
                </Row>
              </Link>
              <Row>
                <Col className="ml-0 pl-0">
                  <p className="float-left ml-0 mb-0">{props.date}</p>
                </Col>
                <Col>
                  <p className="float-right mb-0"> By: {props.author}</p>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="float-left">
              <p className="text-left">{props.body}</p>
              {/* This check to see if the post contains an image, and will display the image if there is */}
              {props.image ? (
                <img
                  className="img-fluid"
                  alt={props.title}
                  src={IMG_URL + props.image}
                />
              ) : null}
            </CardBody>
            <CardFooter>
              <Button className="float-right" type="">
                Comments
              </Button>
              {liked ? (
                <button className="float-left mr-2">
                  <img
                    className="likeButton"
                    src={likedicon}
                    alt="click to unlike post"
                    onClick={unlikePost}
                  />
                </button>
              ) : (
                <button className="float-left mr-2">
                  <img
                    className="likeButton"
                    src={notLiked}
                    alt="click to like post"
                    onClick={likePost}
                  />
                </button>
              )}
              <h3 className="float-left text-secondary pl-3 pr-3 pt-1">
                {rating}
              </h3>
              {error === "" ? null : <p className="error-text"> {error} </p>}
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </PostWrapper>
  );
};

export default PostCard;
