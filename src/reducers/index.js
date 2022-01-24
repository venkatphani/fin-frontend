import { USER_SIGN_IN, USER_SIGN_ERROR, CLEAR_USER_SIGN_ERROR, GET_ALL_ARTICLES, UPLOAD_ARTICLES, SHOW_SUCCESS_MSG } from "../actionTypes";
import { setToken } from "../apis";

const initialState = {
  loginError: {},
  userInfo: {},
  articles: [],
  jwtToken: "",
  showSuccess: false,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN: {
      const { token, data } = action.payload;
      setToken(token);
      return {
        ...state,
        userInfo: data,
        jwtToken: token,
      };
    }

    case GET_ALL_ARTICLES: {
      const { data = [] } = action.payload || {};
      return { ...state, articles: data };
    }

    case UPLOAD_ARTICLES: {
      return { ...state, data: action.payload, showSuccess: true };
    }

    case USER_SIGN_ERROR: {
      const err = action.payload;
      const { response = {} } = err || {};
      const { data = {} } = response || {};
      const { error = {} } = data || {};
      return {
        ...state,
        loginError: error || {},
      };
    }

    case CLEAR_USER_SIGN_ERROR: {
      return {
        ...state,
        loginError: {},
      };
    }

    case SHOW_SUCCESS_MSG: {
      return {
        ...state,
        showSuccess: action.payload,
      };
    }

    default:
      return state;
  }
};
