import { call, put } from "redux-saga/effects";
import API from "../API/PostAPI";
import * as ACTIONS from "../actions/PostActions";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "../types/PostsTypes";
import History from "../../routes/History";
import { NotificationManager } from "react-notifications";

export function* GetPostsListSaga({ payload }) {
  try {
    const response = yield call(API.getPostsList, payload);
    yield put(ACTIONS.GetPostsListActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.GetPostsListActionError(err.response));
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

export function* GetPostDetailsSaga({ payload }) {
  try {
    const response = yield call(API.getPostDetails, payload);
    yield put(ACTIONS.GetPostDetailsActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.GetPostDetailsActionError(err.response));
  }
}

export function* GetPostDetailsStatsPromoSaga({ payload }) {
  try {
    const response = yield call(API.getPostDetailsStatsPromo, payload);
    yield put(ACTIONS.GetPostDetailsStatsPromoActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.GetPostDetailsStatsPromoActionError(err.response));
  }
}

export function* CreatePostSaga({ payload }) {
  try {
    const response = yield call(API.createPost, payload);
    yield put(ACTIONS.CreatePostActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.CreatePostActionError(err.response));
  }
}

export function* UpdatePostDetailsSaga({ payload }) {
  try {
    const response = yield call(API.updatePostDetails, payload);
    yield put(ACTIONS.UpdatePostDetailsActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.UpdatePostDetailsActionError(err.response));
  }
}

export function* DeletePostSaga({ payload }) {
  try {
    const response = yield call(API.deletePost, payload);
    yield put(ACTIONS.DeletePostActionReceive(response.data));
  } catch (err) {
    yield put(ACTIONS.DeletePostActionError(err.response));
  }
}

export function* postsListSaga() {
  yield takeLatest(TYPES.GET_POSTS_LIST_REQUEST, GetPostsListSaga);
  yield takeLatest(TYPES.CREATE_POST_REQUEST, CreatePostSaga);
  yield takeLatest(TYPES.GET_POST_DETAILS_REQUEST, GetPostDetailsSaga);
  yield takeLatest(
    TYPES.GET_POST_DETAILS_STATS_PROMO_REQUEST,
    GetPostDetailsStatsPromoSaga
  );

  yield takeLatest(TYPES.UPDATE_POST_DETAILS_REQUEST, UpdatePostDetailsSaga);
  yield takeLatest(TYPES.DELETE_POST_REQUEST, DeletePostSaga);
}
