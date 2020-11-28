import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import PostService from "../../../../services/post-service";

const PostForm = (props) => {
  const [title, setTitle] = useState(``);
  const [body, setBody] = useState(``);
  const [error, setError] = useState(null);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");

  function onFileSelect(e) {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    console.log(file);
  }

  async function handleSubmit(event) {
    if (title === ``) {
      setError("Please create a title for this post");
      return;
    }
    if (file === "") {
      console.log("submitting");
      PostService.submitPost(title, body).catch((err) => {
        console.log(err);
      });
    } else {
      let formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("body", body);

      PostService.submitImagePost(formData).catch((err) => {
        console.log(err);
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label className="text-left float-left" for="title">
          Title:
        </Label>
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
        <Label for="body" className="text-left float-left">
          Body:
        </Label>
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
        <Label for="file" className="text-left float-left">
          File
        </Label>
        <Input
          type="file"
          name="file"
          id="file"
          // value={file}
          onChange={(e) => {
            onFileSelect(e);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Button className="float-left mb-3" color="info" type="submit">
          Submit
        </Button>
      </FormGroup>
      {error ? null : <p>{error}</p>}
    </Form>
  );
};

export default PostForm;
