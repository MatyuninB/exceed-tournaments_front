import { SET_EVENT, SET_EVENTS, SET_PUBLIC_ID } from "../types";

const initialState = {
  event: [],
  events: [],
  publicId: "dark-code",
};
export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case SET_PUBLIC_ID:
      return {
        ...state,
        publicId: action.payload,
      };

    default:
      return state;
  }
};
