import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const TextPost = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleText">Create A Text Post!</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
    </Form>
  );
};

export default TextPost;
