import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import isEmpty from "lodash/isEmpty";
import { func } from "prop-types";
import {
  FormContainer as FormContainerStyles,
  Input, TextArea as TextAreaStyles
} from "./styles";
import actions from "../../actions/posts";

const FormContainer = styled(FormContainerStyles)`
  margin-bottom: 32px;
`;

const TextArea = styled(TextAreaStyles)`
  margin-top: 12px;
`;

const Circle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-left: auto;
  background-color: ${props => (props.add ? "#F73552" : "#32DD86")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

const initialState = {
  userId: 1,
  title: "",
  body: "",
};

function AddPost(props) {
  const { onAddPost } = props;
  const [postToAdd, setPostToAdd] = useState(initialState);
  const [displayAddPost, setDisplayAddPost] = useState(false);
  
  const onChange = (e) => setPostToAdd({ ...postToAdd, [e.target.name]: e.target.value });

  function onSubmit() {
    onAddPost(postToAdd);
    setPostToAdd(initialState);
    return setDisplayAddPost(!displayAddPost);
  }

  return (
    <FormContainer>
      <Row>
        <Col sm="9">
          {displayAddPost && (
            <form onSubmit={onSubmit}>
              <Input
                value={postToAdd.title}
                type="text"
                placeholder="Título"
                name="title"
                onChange={onChange}
              />
              <TextArea
                value={postToAdd.body}
                placeholder="Descripción"
                name="body"
                onChange={onChange}
              />
              <Button
                color="success"
                className="float-right mt-3"
                disabled={isEmpty(postToAdd.title) || isEmpty(postToAdd.body)}
                onClick={onSubmit}
              >
                Guardar
              </Button>
            </form>
          )}
        </Col>
        <Col sm="3">
          <Circle
            onClick={() => setDisplayAddPost(!displayAddPost)}
            add={displayAddPost}
          >
            <FontAwesomeIcon icon={displayAddPost ? faTimes : faPlus} style={{ color: "#FFF", fontSize: "22px" }} />
          </Circle>
        </Col>
      </Row>
    </FormContainer>
  )
}

AddPost.propTypes = {
  onAddPost: func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onAddPost(data) {
    dispatch({
      type: actions.ADD_POST,
      payload: { data },
    });
  },
});

export default connect(null, mapDispatchToProps)(AddPost);
