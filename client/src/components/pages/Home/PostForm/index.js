import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import PostService from "../../../../services/post-service";

const PostForm = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(``);

  function handleSubmit(event) {
    console.log("submitting");
    event.preventDefault();
    PostService.submitPost(title, body).catch((err) => {
      console.log(err);
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          name="title"
          id="post-title"
          placeholder="Post Title"
        />
      </FormGroup>
      <FormGroup>
        <Label for="body">Body</Label>
        <Input
          onChange={(e) => setBody(e.target.value)}
          type="textarea"
          value={body}
          name="body"
          rows="5"
          id="post-body"
          placeholder="Post Body"
        />
      </FormGroup>
      <FormGroup>
        <Button color="info" type="submit">
          Submit
        </Button>
      </FormGroup>
    </Form>
  );
};

export default PostForm;
