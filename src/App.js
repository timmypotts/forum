import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TextPostInput from "./components/TextPostInput";
import { Container, Row, Col } from "reactstrap";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Row className="mt-2">
          <Col>
            <TextPostInput />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
