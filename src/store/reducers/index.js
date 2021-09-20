import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import lang from "./Lang";
// import loader from "./Loader";
// import UserLandingReducer from "./UserLandingReducer";
// import ASMPReducer from "./ASMPReducer";
// import ServerLog from "./ServerLog";
// import BANReducer from './BANReducer';
// import MSISDNSelectionReducer from './MSISDNSelectionReducer';
// import CMSReducer from './CMSReducer';
// import UserManagementReducer from './UserManagementReducer';
// import PersistantDataReducer from './PersistantDataReducer';
// import SuperAdminReducer from './SuperAdminReducer';
// import TOSReducer from './TOSReducer';
// import OBPReducer from './OBPReducer';
// import AddressReducer from './AddressReducer';
// import OffersReducer from './OffersReducer'
// import NotificationReducer from './NotificationReducer';
// import VPNReducer from './VPNReducer';
// import SAPReducer from './SAPReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        // 'PersistantDataReducer',
        // 'TOSReducer',
        // 'ASMPReducer',
        // 'UserLandingReducer',
        // // 'CMSReducer',
        // 'BANReducer',
        // 'MSISDNSelectionReducer',
        // 'OBPReducer',
    ],
}

const rootReducer = combineReducers({
    //   lang,
    //   loader,
    //   UserLandingReducer,
    //   ASMPReducer,
    //   ServerLog,
    //   BANReducer,
    //   MSISDNSelectionReducer,
    //   CMSReducer,
    //   UserManagementReducer,
    //   PersistantDataReducer,
    //   TOSReducer,
    //   OBPReducer,
    //   OffersReducer,
    //   SuperAdminReducer,
    //   AddressReducer,
    //   NotificationReducer,
    //   VPNReducer,
    //   SAPReducer
});


export default persistReducer(persistConfig, rootReducer);
