import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { dataReducer } from "./reducers";
import { createBrowserHistory } from "history";
import { persistReducer } from "redux-persist";
import session from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";

export const browserHistory = createBrowserHistory();

const reducers = combineReducers({
  data: persistReducer(
    {
      key: "data",
      storage: session,
      blacklist: ["loginError", "showSuccess"],
    },
    dataReducer
  ),
});

export const store = createStore(reducers, applyMiddleware(thunk));

export const persistor = persistStore(store);
