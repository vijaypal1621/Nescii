import * as ActionTypes from "./ActionTypes";

export const Notices = (
  state = {
    isLoading: true,
    errMess: null,
    notices: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTICES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        notices: action.payload,
      };

    case ActionTypes.NOTICES_LOADING:
      return { ...state, isLoading: true, errMess: null, notices: [] };

    case ActionTypes.NOTICES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        notices: [],
      };

    default:
      return state;
  }
};
