import React from "react";
import { Col, Card, CardHeader, CardBody, Row } from "reactstrap";

const PostCard = (props) => {
  return (
    <Row>
      <Col>
        <Card>
          <CardHeader>{props.postTitle}</CardHeader>
          <CardBody>
            <p>{props.postBody}</p>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default PostCard;
