import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";

const UserHandling = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Row className="mt-2 ">
        <Form>
          <Row form>
            <Col>
              <FormGroup>
                <Input
                  type="username"
                  name="username"
                  id="userName"
                  placeholder="username"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="userPassword"
                  placeholder="password"
                />
              </FormGroup>
            </Col>
            <Col>
              <Button>Log In</Button>
            </Col>
          </Row>
        </Form>
        <Col>
          <Button color="success" onClick={toggle}>
            Sign Up
          </Button>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <p className="font-weight-bold">
            Enter your email, username, and password to create an account.
          </p>
          <Form className="mt-2">
            <FormGroup>
              <Label for="Email">Email:</Label>
              <Input
                type="email"
                name="email"
                id="Email"
                placeholder="Link your account to an email, we wont send you anything!"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Username">Username:</Label>
              <Input
                type="username"
                name="username"
                id="Username"
                placeholder="Username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password:</Label>
              <Input
                type="password"
                name="password"
                id="Password"
                placeholder="Password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password:</Label>
              <Input
                type="password"
                name="password"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Register
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserHandling;
