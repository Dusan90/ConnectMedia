import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import LoginReducer from './LoginReducer'
import SitesListReducer from "./SitesListReducer";
import UsersReducer from "./UsersReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        LoginReducer,
        SitesListReducer,
        UsersReducer

    ],
}

const rootReducer = combineReducers({
    LoginReducer,
    SitesListReducer,
    UsersReducer

});


export default persistReducer(persistConfig, rootReducer);
