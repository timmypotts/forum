import React, { useContext, useState } from "react";
import {
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
import AuthService from "../../../services/auth-service";
import CheckUser from "../../../context/CheckUser";
import { UserContext } from "../../../context/UserContext";

const CommentForm = () => {
  return (
    <Form>
      <FormGroup>
        <Label for="Comment">Comment</Label>
        <Input
          type="textarea"
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
