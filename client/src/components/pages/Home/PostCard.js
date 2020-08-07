import React from "react";
import { Col, Card, CardHeader, CardBody, Row } from "reactstrap";

const PostCard = (props) => {
  return (
    <Row>
      <Col>
        <Card>
          <CardHeader>{props.title}</CardHeader>
          <CardBody>
            <p>{props.body}</p>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default PostCard;
