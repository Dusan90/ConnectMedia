import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import LoginReducer from './LoginReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        LoginReducer

    ],
}

const rootReducer = combineReducers({
    LoginReducer

});


export default persistReducer(persistConfig, rootReducer);
