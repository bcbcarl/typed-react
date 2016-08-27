import { takeEvery, delay } from "redux-saga";
import { call, put, Effect } from "redux-saga/effects";

export function* helloSaga(): IterableIterator<void> {
  console.log("Hello Sagas!");
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync(): IterableIterator<Effect> {
  yield call(delay, 1000);
  yield put({ type: "INCREMENT" });
}

// Our watcher Saga: spawn a new task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield* takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    helloSaga(),
    watchIncrementAsync()
  ];
}
