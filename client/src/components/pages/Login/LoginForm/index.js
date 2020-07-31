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
import axios from "axios";

const LoginForm = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:8080/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        console.log("Logged in", { username, password });
      })
      .catch((err) => {
        console.log("Error");
        setError("Incorrect username or password");
      });
  }

  return (
    <Card>
      <CardHeader>Log In</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="Username" sm={2}>
              Username
            </Label>
            <Col sm={10}>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="username"
                name="username"
                id="Username"
                placeholder="Username"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Password" sm={2}>
              Password
            </Label>
            <Col sm={10}>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                name="password"
                id="Password"
                placeholder="Password"
              />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Button color="info" type="submit">
              Log In
            </Button>
            {error ? <div className="error-text">{error}</div> : <div></div>}
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
