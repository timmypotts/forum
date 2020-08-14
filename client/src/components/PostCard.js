import React from "react";
import { Link } from "react-router-dom";
import { PostWrapper } from "../styles/index";

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
    <PostWrapper>
      <Row className="mt-3 mb-3">
        <Col>
          <Card>
            <CardHeader>
              <Link to={`/postpage/${props.postID}/${props.title}/`}>
                <Row>
                  <h3 className="float-left">{props.title}</h3>
                </Row>
              </Link>
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
    </PostWrapper>
  );
};

export default PostCard;
