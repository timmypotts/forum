import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PostWrapper } from "../styles/index";
import PostService from "../services/post-service";
import deleteButton from "./img/redX.png";
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

const DashPostCard = (props) => {
  function deletePost(event) {
    event.preventDefault();
    console.log("DELETING POST");
    PostService.deletePost(props.postID);
  }

  const [rating, setRating] = useState(props.rating);
  const [liked, setLiked] = useState(false);
  const IMG_URL = "http://54.205.120.4:3080/";

  async function likePost() {
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
            <CardHeader>
              <Link to={`/postpage/${props.postID}/${props.title}/`}>
                <Row>
                  <Col className="pl-0">
                    <h3 className="float-left">{props.title}</h3>
                  </Col>
                  <Col>
                    <button color="danger" className="float-right">
                      <img
                        onClick={deletePost}
                        alt="delete post"
                        src={deleteButton}
                        className="float-right delete-button"
                      />
                    </button>
                  </Col>
                </Row>
              </Link>
              <Row>
                <Col className="ml-0 pl-0">
                  <p className="float-left ml-0">{props.date}</p>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="float-left">
              <p className="float-left post-body">{props.body}</p>
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
              <Link to={`/postpage/${props.postID}/${props.title}/`}>
                <Button className="float-right" type="">
                  Comments ({props.comments})
                </Button>
              </Link>
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
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </PostWrapper>
  );
};

export default DashPostCard;
