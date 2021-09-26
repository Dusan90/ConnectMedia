import { loginSaga } from './LoginSaga'
import { sitesListSaga } from './SitesListSaga'
import { usersSaga } from './UsersSaga';

import { all } from "redux-saga/effects";

export function* watchSagas() {
    //Combine sagas with
    yield all([
        loginSaga(),
        sitesListSaga(),
        usersSaga()
    ]);

}
