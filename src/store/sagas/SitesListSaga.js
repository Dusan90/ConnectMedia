import { call, put } from "redux-saga/effects";
import API from "../API/SitesListAPI";
import * as ACTIONS from "../actions/SitesListAction";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "../types/SitesListTypes";
import History from "../../routes/History";
import { NotificationManager } from "react-notifications";

export function* GetSitesListSaga({ payload }) {
  try {
    const response = yield call(API.getSitesList, payload);
    yield put(ACTIONS.GetSitesListActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.GetSitesListActionError(err.response));
    if (
      err.response.data.code === 403 &&
      err.response.data.message === "Invalid token."
    ) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isLoged");
      sessionStorage.removeItem("filterPosts");
      sessionStorage.removeItem("filterWidgets");
      sessionStorage.removeItem("filterSites");
      sessionStorage.removeItem("root");

      NotificationManager.error(`${err.response.data.message}`, "Failed", 2000);
      History.push("/");
    }
  }
}

export function* GetSiteDetailsSaga({ payload }) {
  try {
    const response = yield call(API.getSiteDetails, payload);
    yield put(ACTIONS.GetSiteDetailsActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.GetSiteDetailsActionError(err.response));
  }
}

export function* CreateSiteSaga({ payload }) {
  try {
    const response = yield call(API.createSite, payload);
    yield put(ACTIONS.CreateSiteActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.CreateSiteActionError(err.response));
  }
}

export function* UpdateSiteDetailsSaga({ payload }) {
  try {
    const response = yield call(API.updateSiteDetails, payload);
    yield put(ACTIONS.UpdateSiteDetailsActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.UpdateSiteDetailsActionError(err.response));
  }
}

export function* DeleteSiteSaga({ payload }) {
  try {
    const response = yield call(API.deleteSite, payload);
    yield put(ACTIONS.DeleteSiteActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.DeleteSiteActionError(err.response));
  }
}

export function* sitesListSaga() {
  yield takeLatest(TYPES.GET_SITES_LIST_REQUEST, GetSitesListSaga);
  yield takeLatest(TYPES.CREATE_SITE_REQUEST, CreateSiteSaga);
  yield takeLatest(TYPES.GET_SITE_DETAILS_REQUEST, GetSiteDetailsSaga);
  yield takeLatest(TYPES.UPDATE_SITE_DETAILS_REQUEST, UpdateSiteDetailsSaga);
  yield takeLatest(TYPES.DELETE_SITE_REQUEST, DeleteSiteSaga);
}
