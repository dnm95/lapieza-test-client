import styled, { css } from "styled-components";

const inputStyles = css`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 10px;
  outline: none;
  border: none;
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const TextArea = styled.textarea`
  ${inputStyles}
`;

export const FormContainer = styled.div`
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

export default Input;
