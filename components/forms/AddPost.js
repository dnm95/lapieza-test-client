import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { func } from "prop-types";
import actions from "../../actions/posts";

const inputStyles = css`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 10px;
  outline: none;
  border: none;
`;

const FormContainer = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

const Input = styled.input`
  ${inputStyles}
`;

const TextArea = styled.textarea`
  ${inputStyles}
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
  
  const onChange = (key, value) => setPostToAdd({ ...postToAdd, [key]: value });

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
                onChange={(e) => onChange("title", e.target.value)}
              />
              <TextArea
                value={postToAdd.body}
                placeholder="Descripción"
                onChange={(e) => onChange("body", e.target.value)}
              />
              <Button
                color="success"
                className="float-right mt-3"
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
