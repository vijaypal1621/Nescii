import { createStore, combineReducers, applyMiddleware } from "redux";
import { Notices } from "./notices";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      notices: Notices,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
