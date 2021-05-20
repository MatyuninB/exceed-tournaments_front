import {
  IS_FETCHING,
  SET_AUTH,
  SET_AUTH_CHECK,
  SET_PFOFILE_INFO,
} from "../types";

const initialState = {
  auth: false,
  isFetching: false,
  authInfo: [],
  profileInfo: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case SET_PFOFILE_INFO:
      return {
        ...state,
        profileInfo: action.payload,
      };
    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_AUTH_CHECK:
      return {
        ...state,
        authInfo: action.payload,
      };

    default:
      return state;
  }
};
