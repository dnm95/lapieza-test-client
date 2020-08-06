import React, { useState } from "react";
import styled from "styled-components";
import {
  Row, Col, Modal, ModalHeader, ModalBody,
} from "reactstrap";
import { arrayOf, shape, func } from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import actions from "../../actions/posts";
import EditPostForm from "../forms/EditPost";

const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 10px;
  border: none;
  border-radius: 8px;
  margin: 16px 0px;
  padding: 1.5rem;
`;

const Title = styled.h2`
  color: #3A6EDF;
`;

const Content = styled.p`
  color: #B2B2B2;
`;

const Number = styled.p`
  color: #4ED6F4;
  font-size: 26px;
  text-align: center;
  @media screen and (max-width: 768px) {
    text-align: left;
  }
`;

const Dot = styled.div`
  width: 20px;
  height: 20px;
  background-color: #4ED6F4;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  left: 15px;
`;

function Posts(props) {
  const { posts, onDeletePost } = props;
  const [modal, setModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState({});

  const toggle = () => setModal(!modal);

  const onPrepareModal = (postToUpdate) => {
    toggle();
    setPostToEdit(postToUpdate);
  }

  return (
    <Row>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar Post</ModalHeader>
        <ModalBody>
          <EditPostForm
            onCancel={() => toggle()}
            onOk={() => toggle()}
            post={postToEdit}
          />
        </ModalBody>
      </Modal>

      {posts && posts.map((post) => (
        <Col xs="12" className="mb-4" key={post.id}>
          <Card>
            <Dot />
            <Row className="align-items-center">
              <Col sm="3">
                <Number>{post.id}</Number>
              </Col>
              <Col sm="6">
                <Title>{post.title}</Title>
                <Content>{post.body}</Content>
              </Col>
              <Col sm="3" className="text-right">
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ color: "#B2B2B2", fontSize: "22px", cursor: "pointer" }}
                  onClick={() => onPrepareModal({
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    userId: post.userId,
                  })}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="ml-3"
                  style={{ color: "#F73552", fontSize: "22px", cursor: "pointer" }}
                  onClick={() => onDeletePost(post.id)}
                />
              </Col>  
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: arrayOf(shape()),
  onDeletePost: func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onDeletePost(id) {
    dispatch({
      type: actions.DELETE_POST,
      payload: { id },
    });
  },
});

export default connect(null, mapDispatchToProps)(Posts);