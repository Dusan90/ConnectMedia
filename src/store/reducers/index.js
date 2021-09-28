import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import LoginReducer from './LoginReducer'
import SitesListReducer from "./SitesListReducer";
import UsersReducer from "./UsersReducer";
import CategoryReducer from './CategoryReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        LoginReducer,
        SitesListReducer,
        UsersReducer,
        CategoryReducer

    ],
}

const rootReducer = combineReducers({
    LoginReducer,
    SitesListReducer,
    UsersReducer,
    CategoryReducer

});


export default persistReducer(persistConfig, rootReducer);
