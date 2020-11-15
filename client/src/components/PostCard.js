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
  Border
} from "reactstrap";




const PostCard = (props) => {

  function likePost() {
    console.log("LIKED!");
  
  }


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
              <Row>
                <p className="float-right"> By: {props.author}</p>
              </Row>
            </CardHeader>
            <CardBody className="float-left">
              <p className="text-left">{props.body}</p>
            </CardBody>
            <CardFooter>
              <h3 className="float-left text-secondary border pl-3 pr-3 pt-1">{props.rating}</h3>
              <Button className="float-right" type="" color="success">
                Comments
              </Button>
              <Button className="float-right mr-2" onClick={likePost}>Like</Button>

            </CardFooter>
          </Card>
        </Col>
      </Row>
    </PostWrapper>
  );
};

export default PostCard;
