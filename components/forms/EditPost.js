import React, { useState, useEffect } from "react";
import { Row, Col, Label, Button } from "reactstrap";
import { shape, func } from "prop-types";
import { connect } from "react-redux";
import { FormContainer, Input, TextArea, ButtonsContainer } from "./styles";
import actions from "../../actions/posts";

function EditPost(props) {
  const { post, onOk, onCancel, onUpdatePost} = props;
  const [postToEdit, setPostToEdit] = useState(post);

  useEffect(() => {
    if (post.id !== postToEdit.id) {
      setPostToEdit(post);
    }
  }, [post]);
  
  const onChange = (e) => setPostToEdit({ ...postToEdit, [e.target.name]: e.target.value });

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
              name="title"
              onChange={onChange}
            />
            <Label>Descripción:</Label>
            <TextArea
              value={postToEdit.body}
              placeholder="Body"
              name="body"
              onChange={onChange}
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
