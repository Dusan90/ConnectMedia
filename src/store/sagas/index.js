import { loginSaga } from "./LoginSaga";
import { sitesListSaga } from "./SitesListSaga";
import { usersSaga } from "./UsersSaga";
import { categoryListSaga } from "./CategorySaga";
import { postsListSaga } from "./PostSaga";
import { widgetsListSaga } from "./WidgetSaga";
import { statsSaga } from "./StatsSaga";
import { chartSaga } from "./ChartSaga";

import { all } from "redux-saga/effects";

export function* watchSagas() {
  //Combine sagas with
  yield all([
    loginSaga(),
    sitesListSaga(),
    usersSaga(),
    categoryListSaga(),
    postsListSaga(),
    widgetsListSaga(),
    statsSaga(),
    chartSaga(),
  ]);
}
