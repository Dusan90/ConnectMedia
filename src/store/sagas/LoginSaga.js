import { call, put } from "redux-saga/effects";
import API from "../API/LoginAPI";
import * as ACTIONS from "../actions/LoginAction";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "../types/LoginTypes";

export function* LoginSaga({ payload }) {
  try {
    const response = yield call(API.login, payload);

    sessionStorage.setItem("isLoged", "true");
    yield put(ACTIONS.LoginActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.LoginActionError(err.response));
  }
}

export function* LogOutSaga({ payload }) {
  try {
    const response = yield call(API.logOut, payload);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLoged");
    sessionStorage.removeItem("filterPosts");
    sessionStorage.removeItem("filterWidgets");
    sessionStorage.removeItem("filterSites");
    sessionStorage.removeItem("root");

    yield put(ACTIONS.LogoutActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.LogoutActionError(err.response));
  }
}

export function* loginSaga() {
  yield takeLatest(TYPES.LOGIN_REQUEST, LoginSaga);
  yield takeLatest(TYPES.LOGOUT_REQUEST, LogOutSaga);
}
