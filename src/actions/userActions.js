import { CLEAR_USER_SIGN_ERROR, USER_SIGN_ERROR, USER_SIGN_IN } from "../actionTypes";
import axiosInstance from "../apis";

export const userRegistration = (email, password, history) => {
  return async (dispatch) => {
    axiosInstance
      .post(`/user/register`, { email, password })
      .then(() => {
        history.push("/");
        dispatch({
          type: USER_SIGN_ERROR,
          payload: {},
        });
      })
      .catch((err) => {
        dispatch({
          type: USER_SIGN_ERROR,
          payload: err,
        });
      });
  };
};

export const userLogin = (email, password, history) => {
  return async (dispatch) => {
    axiosInstance
      .post(`/user/login`, { email, password })
      .then((response) => {
        dispatch({
          type: USER_SIGN_IN,
          payload: response.data,
        });
        history.push("/home");
        dispatch({
          type: USER_SIGN_ERROR,
          payload: {},
        });
      })
      .catch((err) => {
        dispatch({
          type: USER_SIGN_ERROR,
          payload: err,
        });
      });
  };
};

export const clearErrors = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_USER_SIGN_ERROR,
      payload: {},
    });
  };
};
