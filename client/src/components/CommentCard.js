import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const CommentCard = (props) => {
  return (
    <div>
      <Card>
        <CardHeader className="text-left">
          {/* {props.username} */}
          <h5 className="float-right ml-1 mb-0">1</h5>
          <button className="float-right">
            <img className="likeButton-comment" src={likedicon} />
          </button>
          <button className="float-right mr-3">Reply</button>
        </CardHeader>
        <CardBody className="text-left mb-0">
          <p className="mb-0">
            Some text, lets make this string a little longer to see how a
            comment would actually look. this long? this long. Sure that seems
            about right
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default CommentCard;
