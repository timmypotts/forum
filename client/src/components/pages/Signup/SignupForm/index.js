import React from "react";
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
import useFormValidation from "./useFormValidation";
import validateAuth from "./validateAuth";

const INITIAL_STATE = {
  email: "",
  username: "",
  password: "",
  passwordConfirm: "",
};

const SignupForm = (props) => {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateAuth);

  return (
    <Card>
      <CardHeader>Register</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="Email" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                onChange={handleChange}
                // onBlur={handleBlur}
                value={values.email}
                className={errors.email && "error-input"}
                type="email"
                name="email"
                id="Email"
                placeholder="Link your account to an email, we wont send you anything!"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Username" sm={2}>
              Username
            </Label>
            <Col sm={10}>
              <Input
                onChange={handleChange}
                // onBlur={handleBlur}
                value={values.username}
                className={errors.email && "error-input"}
                type="username"
                name="username"
                id="Username"
                placeholder="Username"
              />
              {errors.username && (
                <p className="error-text">{errors.username}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Password" sm={2}>
              Password
            </Label>
            <Col sm={10}>
              <Input
                onChange={handleChange}
                // onBlur={handleBlur}
                value={values.password}
                className={errors.password && "error-input"}
                type="password"
                name="password"
                id="Password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="passwordConfirm" sm={2}>
              Confirm Password
            </Label>
            <Col sm={10}>
              <Input
                className="mt-2"
                onChange={handleChange}
                value={values.passwordConfirm}
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="Confirm Password"
              />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Button color="info" type="submit" disabled={isSubmitting}>
              Register
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default SignupForm;
