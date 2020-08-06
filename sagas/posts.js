import {
  takeEvery, put, call,
} from "redux-saga/effects";
import api from "../services/api";
import actions from "../actions/posts";

function* watchFetchPosts() {
  try {
    api.resource = "posts?userId=1";
    const posts = yield call(api.get);
    return yield put({
      type: actions.REQUEST_POSTS_SUCCESS,
      payload: { posts },
    });
  } catch (err) {
    console.log(err);
    return yield put({ type: actions.REQUEST_POSTS_FAILED });
  }
}

function* watchAddPost(action) {
  try {
    const { data } = action.payload;

    api.resource = "posts";
    const body = { ...data };
    yield call(api.post, { body });
    return yield put({
      type: actions.REQUEST_POSTS,
    });
  } catch (err) {
    console.log(err);
    return yield put({ type: actions.ADD_POST_FAILED });
  }
}

function* watchUpdatePost(action) {
  try {
    const { data } = action.payload;

    api.resource = `posts/${data.id}`;
    const body = { ...data };
    yield call(api.put, { body });
    return yield put({
      type: actions.REQUEST_POSTS,
    });
  } catch (err) {
    console.log(err);
    return yield put({ type: actions.ADD_POST_FAILED });
  }
}

function* watchDeletePost(action) {
  try {
    const { id } = action.payload;

    api.resource = `posts/${id}`;
    yield call(api.delete);
    return yield put({
      type: actions.REQUEST_POSTS,
    });
  } catch (err) {
    console.log(err);
    return yield put({ type: actions.ADD_POST_FAILED });
  }
}

export default function* sagas() {
  yield takeEvery(actions.REQUEST_POSTS, watchFetchPosts);
  yield takeEvery(actions.ADD_POST, watchAddPost);
  yield takeEvery(actions.UPDATE_POST, watchUpdatePost);
  yield takeEvery(actions.DELETE_POST, watchDeletePost);
}
