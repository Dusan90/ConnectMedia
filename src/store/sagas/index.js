// import { sagaUserData } from './UserLandingSagas';
// import { sagaASMP } from './ASMPSagas';
// import { sagaServerLogs } from './ServerLogSagas';
// import { sagaBansData } from './BANSagas';
// import { sagaSuperAdmin } from './SuperAdminSagas';
// import { sagaSubscribersData } from './MSISDNSelectionSagas';
// import { sagaGetLangConstsData } from './CMSSagas';
// import { sagaUserManagement } from './UserManagementSagas';
// import { sagaTOS } from './TOSSagas';
// import { sagaOBPData } from './OBPSagas';
// import { offersSagas } from './OffersSagas';
// import { AddressSagas } from './AddressSagas';
// import { NotificationSagas } from './NotificationsSagas';
// import { sagaVPN } from './VPNSagas';
// import { SAPSaga } from './SAPSaga';

import { all } from "redux-saga/effects";

export function* watchSagas() {
    //Combine sagas with
    yield all([
        // sagaUserData(),
        // sagaASMP(),
        // sagaServerLogs(),
        // sagaBansData(),
        // sagaSubscribersData(),
        // sagaSuperAdmin(),
        // sagaGetLangConstsData(),
        // sagaUserManagement(),
        // sagaTOS(),
        // sagaOBPData(),
        // offersSagas(),
        // AddressSagas(),
        // NotificationSagas(),
        // sagaVPN(),
        // SAPSaga()
    ]);
    // OR
    // yield all([fork(saga1)]);
}
