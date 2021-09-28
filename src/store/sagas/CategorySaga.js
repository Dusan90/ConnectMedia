import { call, put } from "redux-saga/effects";
import API from "../API/CategoryAPI";
import * as ACTIONS from "../actions/CategoryAction";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "../types/CategoryTypes";

export function* GetCategoryListSaga({ payload }) {
    try {
        const response = yield call(API.getCategoryList, payload);
        yield put(ACTIONS.GetCategoryListActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.GetCategoryListActionError(err.response));
    }
}

export function* GetCategoryDetailsSaga({ payload }) {
    try {
        const response = yield call(API.getCategoryDetails, payload);
        yield put(ACTIONS.GetCategoryDetailsActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.GetCategoryDetailsActionError(err.response));
    }
}

export function* CreateCategoryaga({ payload }) {
    try {
        const response = yield call(API.createCategory, payload);
        yield put(ACTIONS.CreateCategoryActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.CreateCategoryActionError(err.response));
    }
}

export function* UpdateCategoryDetailsSaga({ payload }) {
    try {
        const response = yield call(API.updateCategoryDetails, payload);
        yield put(ACTIONS.UpdateCategoryDetailsActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.UpdateCategoryDetailsActionError(err.response));
    }
}

export function* DeleteCategoryaga({ payload }) {
    try {
        const response = yield call(API.deleteCategory, payload);
        yield put(ACTIONS.DeleteCategoryActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.DeleteCategoryActionError(err.response));
    }
}


export function* categoryListSaga() {
    yield takeLatest(TYPES.GET_CATEGORY_LIST_REQUEST, GetCategoryListSaga);
    yield takeLatest(TYPES.CREATE_CATEGORY_REQUEST, CreateCategoryaga);
    yield takeLatest(TYPES.GET_CATEGORY_DETAILS_REQUEST, GetCategoryDetailsSaga);
    yield takeLatest(TYPES.UPDATE_CATEGORY_DETAILS_REQUEST, UpdateCategoryDetailsSaga);
    yield takeLatest(TYPES.DELETE_CATEGORY_REQUEST, DeleteCategoryaga);
}
