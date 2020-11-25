import React, { useState } from "react";
import LikeService from "../services/like-service";
import notLiked from "./img/not-liked.png";
import likedicon from "./img/liked.png";
import deleteButton from "./img/redX.png";
import { Card, CardHeader, CardBody } from "reactstrap";
import commentService from "../services/comment-service";

const DashCommentCard = (props) => {
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(props.rating);

  async function likeComment() {
    if (JSON.parse(localStorage.getItem("user")) == null) {
      setError("Please sign in to like a post");
      return;
    }
    setLiked(true);
    let newRating = await LikeService.likeComment(props.commentID);
    console.log(newRating);
    setRating(newRating);
  }

  //Executes when the delete button is clicked
  function deleteComment(event) {
    event.preventDefault();
    console.log("DELETING Comment");
    commentService.deleteComment(props.commentID);
  }

  async function unlikeComment() {
    setLiked(false);
    let newRating = await LikeService.unlikeComment(props.commentID);
    console.log(newRating);
    setRating(newRating);
  }
  return (
    <div>
      <Card className="mb-2">
        <CardHeader className="text-left mb-0">
          <button color="danger" className="float-right">
            <img
              onClick={deleteComment}
              alt="delete post"
              src={deleteButton}
              className="float-right delete-button-comment"
            />
          </button>
          <h6 className="float-left ml-0 mb-0 pt-1">{props.author}:</h6>
          {liked ? (
            <button className="float-right mr-2">
              <img
                className="likeButton-comment"
                src={likedicon}
                alt="click to unlike post"
                onClick={unlikeComment}
              />
            </button>
          ) : (
            <button className="float-right mr-2">
              <img
                className="likeButton-comment"
                src={notLiked}
                alt="click to like post"
                onClick={likeComment}
              />
            </button>
          )}
          <button className="float-right mr-2">Reply</button>
          <h5 className="float-right mr-3 ml-1 mb-0">{rating}</h5>
        </CardHeader>
        <CardBody className="text-left mb-0">
          <p className="mb-0">{props.commentText}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashCommentCard;
