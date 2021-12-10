import { call, put } from "redux-saga/effects";
import API from "../API/ChartAPI";
import * as ACTIONS from "../actions/ChartAction";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "../types/ChartTypes";

export function* TotalSaga({ payload }) {
  try {
    const response = yield call(API.totals, payload);
    yield put(ACTIONS.TotalReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.TotalError(err.response));
  }
}

export function* SpecSiteTotalSaga({ payload }) {
  try {
    const response = yield call(API.specSiteTotals, payload);
    yield put(ACTIONS.SpecSiteChartReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.SpecSiteChartError(err.response));
  }
}

export function* chartSaga() {
  yield takeLatest(TYPES.GET_TOTAL_CHART_REQUEST, TotalSaga);
  yield takeLatest(TYPES.GET_SPEC_SITE_CHART_REQUEST, SpecSiteTotalSaga);
}
