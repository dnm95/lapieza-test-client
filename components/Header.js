import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(/claudio-schwarz-purzlbaum-nIkzafOwdGA-unsplash.jpg);
  background-position: center;
  h1 {
    color: #FFF;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Carlos posts</h1>
    </HeaderContainer>
  );
}

export default Header;
