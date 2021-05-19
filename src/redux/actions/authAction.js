import {
  SET_AUTH,
  SET_AUTH_CHECK,
  SET_PFOFILE_INFO,
  IS_FETCHING,
} from "../types";
import axios from "axios";

export const setAuth = (show) => ({
  type: SET_AUTH,
  payload: show,
});

export const setAuthCheck = () => {
  return async (dispatch) => {
    axios
      .get("https://dark-torch-268518.appspot.com/tockenCheck", {
        headers: { auth: localStorage.getItem("token") },
      })
      .then((res) => {
        dispatch({
          type: SET_AUTH_CHECK,
          payload: res.data,
        });
        dispatch({
          type: SET_AUTH,
          payload: true,
        });
      })
      .catch(function (err) {
        dispatch({
          type: SET_AUTH,
          payload: false,
        });
      });
  };
};

export const setProfileInfo = () => {
  return async (dispatch) => {
    dispatch({
      type: IS_FETCHING,
      payload: true,
    });
    axios
      .get("https://dark-torch-268518.appspot.com/userInfo", {
        headers: {
          auth: localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        dispatch({
          type: SET_PFOFILE_INFO,
          payload: res.data,
        });
        dispatch({
          type: IS_FETCHING,
          payload: false,
        });
      })
      .catch(function (err) {
        dispatch({
          type: IS_FETCHING,
          payload: true,
        });
      });
  };
};
