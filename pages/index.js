import React from "react";
import { arrayOf, shape, bool } from "prop-types";
import {
  Container, Spinner
} from "reactstrap";
import styled from "styled-components";
import HOC from "../hoc";
import actions from "../actions/posts";
import selectors from "../selectors/user";
import Posts from "../components/commons/Posts";
import AddPost from "../components/forms/AddPost";

const StyledContainer = styled(Container)`
  margin-top: -30px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function Home(props) {
  const { posts, requesting } = props;

  return (
    <StyledContainer>
      <AddPost />
      {requesting ? (
        <SpinnerContainer>
          <Spinner style={{ width: "250px", height: "250px", margin: "0 auto" }} type="grow" />
        </SpinnerContainer>
      ) : (
        <Posts posts={posts} />
      )
      }
    </StyledContainer>
  )
}

Home.defaultProps = {
  posts: [],
  requesting: false,
};

Home.propTypes = {
  posts: arrayOf(shape()),
  requesting: bool,
};

const mapStateToProps = (state) => ({
  posts: selectors(state).user.posts,
  requesting: selectors(state).user.requesting,
});

export default HOC(mapStateToProps)(Home, {
  type: actions.REQUEST_POSTS,
});
