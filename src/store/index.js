import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from 'redux-persist';
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import { watchSagas } from "./sagas";
const saga = createSagaMiddleware();
//redux dev tool
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(applyMiddleware(saga));

export const store = createStore(reducers, enhancer);

export const persistor = persistStore(store);

saga.run(watchSagas);

// export default { store, persistor };
