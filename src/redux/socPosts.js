import * as ActionTypes from "./ActionTypes";

export const SocPosts = (
  state = {
    isLoading: true,
    errMess: null,
    socPosts: [],
    societyDetails: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SOCPOSTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        socPosts: action.payload.socPosts,
        societyDetails: action.payload.societyDetails,
      };

    case ActionTypes.SOCPOSTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        socPosts: [],
        societyDetails: null,
      };

    case ActionTypes.SOCPOSTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        socPosts: [],
        societyDetails: null,
      };

    default:
      return state;
  }
};
