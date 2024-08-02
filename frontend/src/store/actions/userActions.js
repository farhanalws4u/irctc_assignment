import * as api from "../../api/userApi";
import { ADD_USER_DATA, SET_USER_DATA } from "../../constants/actionTypes";
import { setUserLoading } from "./authActions";

export const addUserData = (newData) => async (dispatch) => {
  dispatch(setUserLoading(true));
  try {
    const { data } = await api.addUserData(newData);

    console.log(data);

    dispatch({ type: ADD_USER_DATA, payload: data });

    dispatch(setUserLoading(false));
  } catch (error) {
    console.log(error);

    dispatch(setUserLoading(false));
  }
};

export const getUserData = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserData(id);

    dispatch({ type: SET_USER_DATA, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addDeviceToken = (body) => async (dispatch) => {
  try {
    const { data } = await api.addDeviceToken(body);
    console.log("added device token to user", data);
  } catch (error) {
    console.log(error);
  }
};
