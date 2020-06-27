import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TextPost from "./components/TextPost";
import { Row, Col } from "reactstrap";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Row>
        <Col lg="10" md="10" sm="10" xs="12">
          <TextPost />
        </Col>
      </Row>
    </div>
  );
}

export default App;
