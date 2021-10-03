import { call, put } from "redux-saga/effects";
import API from "../API/StatsAPI";
import * as ACTIONS from "../actions/StatsAction";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "../types/StatsTypes";




export function* GetStatsSaga({ payload }) {
    try {
        const response = yield call(API.getStats, payload);
        yield put(ACTIONS.GetStatsActionReceive(response.data));
    } catch (err) {
        yield put(ACTIONS.GetStatsActionError(err.response));
    }
}





export function* statsSaga() {
    yield takeLatest(TYPES.GET_STATS_REQUEST, GetStatsSaga);

}
