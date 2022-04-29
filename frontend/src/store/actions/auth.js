import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_MESSAGE,
  EDIT_USER,
} from "./types";
import AuthService from "../../services/authService";
import userService from "../../services/userService";
export const register = (name, username, email, password) => (dispatch) => {
  return AuthService.register(name, username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
export const login = (username, password) => (dispatch) => {
  return AuthService.loggin(username, password).then((data) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });
  });
};
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export const editUser = (id, name, username, email, password) => (dispatch) => {
  return userService
    .editUser(id, name, username, email, password)
    .then((data) => {
      dispatch({
        type: EDIT_USER,
        payload: { user: data },
      });
    });
};
