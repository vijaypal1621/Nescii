import { createStore, combineReducers, applyMiddleware } from "redux";
import { Notices } from "./notices";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Posts } from "./posts";
import { SocPosts } from "./socPosts";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      notices: Notices,
      posts: Posts,
      socPosts: SocPosts,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
