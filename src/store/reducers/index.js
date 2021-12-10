import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LoginReducer from "./LoginReducer";
import SitesListReducer from "./SitesListReducer";
import UsersReducer from "./UsersReducer";
import CategoryReducer from "./CategoryReducer";
import PostsReducer from "./PostsReducer";
import WidgetReducer from "./WidgetReducer";
import StatsReducer from "./StatsReducer";
import ChartRreducer from "./ChartRreducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    LoginReducer,
    SitesListReducer,
    UsersReducer,
    CategoryReducer,
    PostsReducer,
    WidgetReducer,
    StatsReducer,
    ChartRreducer,
  ],
};

const rootReducer = combineReducers({
  LoginReducer,
  SitesListReducer,
  UsersReducer,
  CategoryReducer,
  PostsReducer,
  WidgetReducer,
  StatsReducer,
  ChartRreducer,
});

export default persistReducer(persistConfig, rootReducer);
