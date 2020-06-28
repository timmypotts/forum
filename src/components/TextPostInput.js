import React from "react";
import { Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const TextPostInput = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label className="font-weight-bold" for="exampleText">
          Create A Text Post!
        </Label>
        <Input type="textarea" rows="4" name="text" id="exampleText" />
        <Button className="mt-1 float-right" color="success">
          Post
        </Button>
      </FormGroup>
    </Form>
  );
};

export default TextPostInput;
