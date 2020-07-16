import React from "react";
import { Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const TextPostInput = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label className="font-weight-bold">Post Title</Label>
        <Input type="textarea" rows="1" name="title" id="postTitle" />
        <Label className="font-weight-bold">Post Body</Label>
        <Input type="textarea" rows="4" name="body" id="postBody" />
        <Button className="mt-1 float-right" color="success">
          Post
        </Button>
      </FormGroup>
    </Form>
  );
};

export default TextPostInput;
