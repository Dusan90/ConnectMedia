import { call, put } from "redux-saga/effects";
import API from "../API/WidgetAPI";
import * as ACTIONS from "../actions/WidgetActions";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "../types/WidgetsTypes";
import History from "../../routes/History";
import { NotificationManager } from "react-notifications";

export function* GetWidgetsListSaga({ payload }) {
  try {
    const response = yield call(API.getWidgetsList, payload);
    yield put(ACTIONS.GetWidgetsListActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.GetWidgetsListActionError(err.response));
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

export function* GetWidgetDetailsSaga({ payload }) {
  try {
    const response = yield call(API.getWidgetDetails, payload);
    yield put(ACTIONS.GetWidgetDetailsActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.GetWidgetDetailsActionError(err.response));
  }
}

export function* CreateWidgetSaga({ payload }) {
  try {
    const response = yield call(API.createWidget, payload);
    yield put(ACTIONS.CreateWidgetActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.CreateWidgetActionError(err.response));
  }
}

export function* UpdateWidgetDetailsSaga({ payload }) {
  try {
    const response = yield call(API.updateWidgetDetails, payload);
    yield put(ACTIONS.UpdateWidgetDetailsActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.UpdateWidgetDetailsActionError(err.response));
  }
}

export function* DeleteWidgetSaga({ payload }) {
  try {
    const response = yield call(API.deleteWidget, payload);
    yield put(ACTIONS.DeleteWidgetActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.DeleteWidgetActionError(err.response));
  }
}

export function* ViewWidgetSaga({ payload }) {
  try {
    const response = yield call(API.viewWidget, payload);
    yield put(ACTIONS.ViewWidgetActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.ViewWidgetActionError(err.response));
  }
}

export function* widgetsListSaga() {
  yield takeLatest(TYPES.GET_WIDGETS_LIST_REQUEST, GetWidgetsListSaga);
  yield takeLatest(TYPES.CREATE_WIDGET_REQUEST, CreateWidgetSaga);
  yield takeLatest(TYPES.GET_WIDGET_DETAILS_REQUEST, GetWidgetDetailsSaga);
  yield takeLatest(
    TYPES.UPDATE_WIDGET_DETAILS_REQUEST,
    UpdateWidgetDetailsSaga
  );
  yield takeLatest(TYPES.DELETE_WIDGET_REQUEST, DeleteWidgetSaga);
  yield takeLatest(TYPES.VIEW_WIDGET_REQUEST, ViewWidgetSaga);
}
