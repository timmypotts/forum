import React from "react";

import {
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Row,
  Button,
} from "reactstrap";

const PostCard = (props) => {
  return (
    <Row className="mt-3 mb-3">
      <Col>
        <Card>
          <CardHeader>
            <Row>
              <h3 className="float-left">{props.title}</h3>
            </Row>
            <Row>
              <p>{props.date}</p>
            </Row>
          </CardHeader>
          <CardBody className="float-left">
            <p className="float-left">{props.body}</p>
          </CardBody>
          <CardFooter>
            <Button className="float-right" type="" color="success">
              Comments
            </Button>
            <Button className="float-left">Like</Button>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

export default PostCard;
