import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const PostForm = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="title">Email</Label>
        <Input
          type="text"
          name="title"
          id="post-title"
          placeholder="Post Title"
        />
      </FormGroup>
      <FormGroup>
        <Label for="body">Text Area</Label>
        <Input
          type="textarea"
          name="body"
          rows="5"
          id="post-body"
          placeholder="Post Body"
        />
      </FormGroup>

      <Button color="info" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
