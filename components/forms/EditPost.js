import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Row, Col, Label, Button } from "reactstrap";
import { shape, func } from "prop-types";
import { connect } from "react-redux";
import actions from "../../actions/posts";

const inputStyles = css`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 10px;
  outline: none;
  border: none;
  margin-bottom: 12px;
`;

const FormContainer = styled.div`
  width: 100%;
`;

const Input = styled.input`
  ${inputStyles}
`;

const TextArea = styled.textarea`
  ${inputStyles}
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

function EditPost(props) {
  const { post, onOk, onCancel, onUpdatePost} = props;
  const [postToEdit, setPostToEdit] = useState(post);

  useEffect(() => {
    if (post.id !== postToEdit.id) {
      setPostToEdit(post);
    }
  }, [post]);
  
  const onChange = (key, value) => setPostToEdit({ ...postToEdit, [key]: value });

  function onBeforeSubmit(e) {
    onUpdatePost(postToEdit);
    return onOk();
  } 

  return (
    <FormContainer>
      <form>
        <Row>
          <Col sm="12">
            <Label>Título:</Label>
            <Input
              value={postToEdit.title}
              type="text"
              placeholder="Title"
              onChange={(e) => onChange("title", e.target.value)}
            />
            <Label>Descripción:</Label>
            <TextArea
              value={postToEdit.body}
              placeholder="Body"
              onChange={(e) => onChange("body", e.target.value)}
            />
            <ButtonsContainer>
              <Button color="success" onClick={onBeforeSubmit} className="mr-2">
                Guardar cambios
              </Button>
              <Button color="secondary" onClick={onCancel}>Cancelar</Button>
            </ButtonsContainer>
          </Col>          
        </Row>
      </form>
    </FormContainer>
  )
}

EditPost.defaultProps = {
  post: {},
};

EditPost.propTypes = {
  post: shape(),
  onCancel: func.isRequired,
  onOk: func.isRequired,
  onUpdatePost: func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onUpdatePost(data) {
    dispatch({
      type: actions.UPDATE_POST,
      payload: { data },
    });
  },
});

export default connect(null, mapDispatchToProps)(EditPost);
