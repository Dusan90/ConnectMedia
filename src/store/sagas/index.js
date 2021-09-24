import { loginSaga } from './LoginSaga'

import { all } from "redux-saga/effects";

export function* watchSagas() {
    //Combine sagas with
    yield all([
        loginSaga()
    ]);

}
