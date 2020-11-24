import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import CommentService from "../../../services/comment-service";

const CommentForm = (props) => {
  const [error, setError] = "";
  const [comment, setComment] = useState(``);
  const postID = props.postID.postID;

  function handleSubmit(event) {
    if (comment === ``) {
      setError("Please create a title for this post");
      return;
    }
    console.log("submitting");
    CommentService.submitComment(postID, comment).catch((err) => {
      console.log(postID);
      console.log(err);
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="Comment">Comment</Label>
        <Input
          onChange={(e) => setComment(e.target.value)}
          type="textarea"
          value={comment}
          name="comment"
          rows="5"
          id="comment"
          placeholder="Leave a Comment"
        />
      </FormGroup>
      <FormGroup>
        <Button className="float-left" type="submit">
          Submit
        </Button>
      </FormGroup>
    </Form>
  );
};

export default CommentForm;
