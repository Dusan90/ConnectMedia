import { call, put } from "redux-saga/effects";
import API from "../API/LoginAPI";
import * as ACTIONS from "../actions/LoginAction";
// import * as USER_LANDING_ACTIONS from '../actions/UserLanding';
// import * as NOTIFICATION_ACTIONS from '../actions/Notifications';
// import { dispatchSnackbarError } from "../../utils/Shared";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "../types/LoginTypes";
// import { loader } from "../actions/Loader";
// import Auth from '../../utils/Auth';

export function* LoginSaga({ payload }) {
    try {
        const response = yield call(API.login, payload);

        sessionStorage.setItem('isLoged', 'true');
        yield put(ACTIONS.LoginActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.LoginActionError(err.response));
    }
}

export function* LogOutSaga({ payload }) {
    try {
        const response = yield call(API.logOut, payload);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isLoged');
        yield put(ACTIONS.LogoutActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.LogoutActionError(err.response));
    }
}


export function* loginSaga() {
    yield takeLatest(TYPES.LOGIN_REQUEST, LoginSaga);
    yield takeLatest(TYPES.LOGOUT_REQUEST, LogOutSaga);
}
