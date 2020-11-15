import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import PostService from "../../../../services/post-service";

const PostForm = (props) => {
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(``);
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    if (title === null){
      setError("Please create a title for this post");
      return;
    }
    console.log("submitting");
    // event.preventDefault();
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
        <Button className="float-left" color="info" type="submit">
          Submit
        </Button>
      </FormGroup>
      {error ? (null) : (<h3>{error}</h3>)}
    </Form>
  );
};

export default PostForm;
