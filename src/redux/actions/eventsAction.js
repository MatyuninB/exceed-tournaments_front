import { SET_EVENT, SET_EVENTS, SET_PUBLIC_ID } from "../types";
import axios from "axios";

export const setEvent = (id) => {
  return async (dispatch) => {
    try {
      axios
        .get(
          `https://dark-torch-268518.appspot.com/tornament?publicID=${id}`
        )
        .then((res) => {
          dispatch({
            type: SET_EVENT,
            payload: res.data.description,
          });
        //   dispatch({
        //     type: SET_PUBLIC_ID,
        //     payload: res.data.publicID,
        //   });
        });
    } catch (e) {}
  };
};
export const setMainPage = (id) => ({
    type: SET_PUBLIC_ID,
    payload: id,
  });
export const setEvents = () => {
  return async (dispatch) => {
    try {
      axios
        .get("https://dark-torch-268518.appspot.com/tournaments")
        .then((res) => {
          dispatch({
            type: SET_EVENTS,
            payload: res.data,
          });
        });
    } catch (e) {}
  };
};
