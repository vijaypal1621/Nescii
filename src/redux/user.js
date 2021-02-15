import * as ActionTypes from "./ActionTypes";

export const User = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
