import { all, fork } from "redux-saga/effects";
import posts from "./posts";

export default function* mainSagas() {
  yield all([
    fork(posts),
  ]);
}
