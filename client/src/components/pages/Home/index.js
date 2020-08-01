import React, { useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import PostForm from "./PostForm";

export default function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <PostForm />
        </Col>
      </Row>
    </Container>
  );
}
