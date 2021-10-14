import { call, put } from "redux-saga/effects";
import API from "../API/UsersAPI";
import * as ACTIONS from "../actions/UsersActions";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "../types/UsersTypes";
import History from "../../routes/History";
import { NotificationManager } from "react-notifications";


export function* GetSelfUserSaga({ payload }) {
    try {
        const response = yield call(API.getSelfUser, payload);
        yield put(ACTIONS.GetSelfUserActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.GetSelfUserActionError(err.response));
    }
}

export function* GetUsersListSaga({ payload }) {
    try {
        const response = yield call(API.geUsersList, payload);
        yield put(ACTIONS.GetUsersListActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.GetUsersListActionError(err.response));
        if (err.response.data.code === 403 && err.response.data.message === 'Invalid token.') {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('isLoged')
            NotificationManager.error(`${err.response.data.message}`, "Failed", 2000);
            History.push('/')
        }
    }
}

export function* CreateUserSaga({ payload }) {
    try {
        const response = yield call(API.createUser, payload);
        yield put(ACTIONS.CreateUserActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.CreateUserActionError(err.response));
    }
}

export function* ChangeSelfUserPassSaga({ payload }) {
    try {
        const response = yield call(API.changeSelfUserPass, payload);
        yield put(ACTIONS.ChangeSelfUserPassActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.ChangeSelfUserPassActionError(err.response));
    }
}

export function* GetSpecUserDetailsSaga({ payload }) {
    try {
        const response = yield call(API.getSpecUserDetails, payload);
        yield put(ACTIONS.GetSpecUserDetailsActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.GetSpecUserDetailsActionError(err.response));
    }
}

export function* UpdateSpecUserSaga({ payload }) {
    try {
        const response = yield call(API.updateSpecUser, payload);
        yield put(ACTIONS.UpdateSpecUsersActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.UpdateSpecUsersActionError(err.response));
    }
}

export function* DeleteSpecUserSaga({ payload }) {
    try {
        const response = yield call(API.deleteSpecUser, payload);
        yield put(ACTIONS.DeleteSpecUsersActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.DeleteSpecUsersActionError(err.response));
    }
}


export function* usersSaga() {
    yield takeLatest(TYPES.GET_SELF_USER_REQUEST, GetSelfUserSaga);
    yield takeLatest(TYPES.GET_USERS_LIST_REQUEST, GetUsersListSaga);
    yield takeLatest(TYPES.CREATE_USER_REQUEST, CreateUserSaga);
    yield takeLatest(TYPES.CHANGE_SELF_USER_PASS_REQUEST, ChangeSelfUserPassSaga);
    yield takeLatest(TYPES.GET_SPEC_USER_DETAILS_REQUEST, GetSpecUserDetailsSaga);
    yield takeLatest(TYPES.UPDATE_SPEC_USER_REQUEST, UpdateSpecUserSaga);
    yield takeLatest(TYPES.DELETE_SPEC_USER_REQUEST, DeleteSpecUserSaga);

}
