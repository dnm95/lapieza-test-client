import { fromJS } from "immutable";
import actions from "../actions/posts";

const initialState = fromJS({
  requesting: false,
  posts: [],
});

const userState = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_POST:
    case actions.UPDATE_POST:
    case actions.DELETE_POST:
    case actions.REQUEST_POSTS: {
      return state.set("requesting", true);
    }

    case actions.REQUEST_POSTS_SUCCESS: {
      const { posts } = payload;

      return state
        .set("posts", posts)
        .set("requesting", false);
    }

    case actions.REQUEST_POSTS_FAILED: {
      return state.merge(initialState);
    }

    case actions.ADD_POST_FAILED:
    case actions.UPDATE_POST_FAILED:
    case actions.DELETE_POST_FAILED:
      return state.set("requesting", false);

    default:
      return state;
  }
};

export default userState;
