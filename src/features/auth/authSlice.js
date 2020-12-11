import { createSlice } from "@reduxjs/toolkit";
import { login as loginUser, loginWithToken } from "../../api/auth";
import { setToken } from "../../api/axios";
import { hideModal, showModal } from "../modals/modalSlice";

let initialState = {
  user: {},
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state, _) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.authToken;
      setToken(action.payload.authToken);
      localStorage.setItem("token", action.payload.authToken);
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutStart(state, _) {
      state.isLoading = true;
    },
    logoutSuccess(state, _) {
      state.user = {};
      state.token = null;
      state.isLoading = false;
    },
    logoutFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    checkAuthStart(state, _) {
      state.isLoading = true;
    },
    checkAuthSuccess(state, action) {
      state.user = action.payload;
      state.isLoading = false;
    },
    checkAuthFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  checkAuthStart,
  checkAuthSuccess,
  checkAuthFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;

export const logIn = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const user = await loginUser(credentials);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
    dispatch(
      showModal({
        modalType: "ERROR_MODAL",
        modalProps: {
          message: error.message,
        },
      })
    );
  }
};

export const checkAuth = () => async (dispatch) => {
  const currentToken = localStorage.getItem("token");
  setToken(currentToken);
  try {
    dispatch(checkAuthStart());
    const user = await loginWithToken(currentToken);
    dispatch(checkAuthSuccess(user));
  } catch (error) {
    dispatch(checkAuthFailure(error.message));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.clear();
  try {
    dispatch(logoutStart());
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error));
  }
};
