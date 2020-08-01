import React, { useContext } from "react";
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
import { AuthService, UserContext } from "../../../../services/auth-service";
import CheckUser from "../../../../context/CheckUser";

const LoginForm = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const { user, setUser } = useContext(UserContext);
  const { login, logout, register, getCurrentUser } = AuthService();

  function handleSubmit(event) {
    event.preventDefault();
    AuthService.login(username, password)
      .then((response) => {
        console.log(response.data);
        console.log("Logged in", { username, password });
        setUser(username);
      })
      .catch((err) => {
        console.log("Error");
        setError("Incorrect username or password");
      });
  }

  return (
    <Card>
      <CheckUser />
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
