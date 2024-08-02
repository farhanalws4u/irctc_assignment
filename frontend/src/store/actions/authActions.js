import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
} from "../../constants/actionTypes";

import * as api from "../../api/authApi";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));

    const { data } = await api.registerUser(userData);

    console.log(data);

    dispatch(setUserLoading(false));

    return true;
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
    dispatch(setUserLoading(false));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));

    const { data } = await api.loginUser(userData);

    console.log(data);

    if (data.success) {
      const { token } = data;

      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded,
      });
      dispatch(setUserLoading(false));
    }
  } catch (error) {
    dispatch(setUserLoading(false));
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const googleLogin = (userData) => async (dispatch) => {
  try {
    const { data } = await api.googleLogin(userData);
    const decoded = jwt_decode(data.token);

    localStorage.setItem("jwtToken", data.token);

    setAuthToken(data.token);

    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentUser = (decoded) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });
};

export const setAuthErrors = (errors) => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: errors,
  });
};

export const setUserLoading = (value) => {
  return {
    type: USER_LOADING,
    payload: value,
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch(setUserLoading(true));
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);

  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
  dispatch(setUserLoading(false));
};
