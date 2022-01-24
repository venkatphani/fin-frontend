import { GET_ALL_ARTICLES, SHOW_SUCCESS_MSG, UPLOAD_ARTICLES } from "../actionTypes";
import axiosInstance from "../apis";

export const getAllArticles = () => {
  return async (dispatch) => {
    axiosInstance
      .get(`/article/all`)
      .then((response) => {
        dispatch({
          type: GET_ALL_ARTICLES,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const uploadArticles = (dataToUpload) => {
  return async (dispatch) => {
    axiosInstance
      .post(`/article/bulkcreate`, { dataToUpload })
      .then((response) => {
        dispatch({
          type: UPLOAD_ARTICLES,
          payload: response.data,
        });
      })
      .catch((err) => {});
  };
};

export const clearSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: SHOW_SUCCESS_MSG,
      payload: false,
    });
  };
};
