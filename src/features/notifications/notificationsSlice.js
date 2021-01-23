import { createSlice } from "@reduxjs/toolkit";
import { config } from "../../consts";

import {
  clearNotifications as apiClearNotifications,
  updateNotification as apiUpdateNotifications,
} from "../../api/notification";

const initialState = {
  isLoading: false,
  notifications: [],
  error: null,
};

const notificationsSlice = createSlice({
  name: "notificationsSlice",
  initialState,
  reducers: {
    fetchNotificationsStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    fetchNotificationsSuccess(state, action) {
      // Convert the array to map
      const notificationsMap = {};

      action.payload.forEach((n, i) => {
        notificationsMap[i] = n;
      });

      state.notifications = notificationsMap;
      state.isLoading = false;
      state.error = null;
    },
    fetchNotificationsError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearNotificationsStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    clearNotificationsSuccess(state, action) {
      state.notifications = {};
      state.isLoading = false;
      state.error = null;
    },
    clearNotificationsError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateNotificationStart() {},
    updateNotificationSuccess(state, action) {
      state.isLoading = false;
      const notificationsMap = {};

      action.payload.forEach((n, i) => {
        notificationsMap[i] = n;
      });

      state.notifications = notificationsMap;
      state.error = null;
    },
    updateNotificationError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchNotificationsError,
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  updateNotificationError,
  updateNotificationStart,
  updateNotificationSuccess,
  clearNotificationsError,
  clearNotificationsStart,
  clearNotificationsSuccess,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const fetchNotifications = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  const token = localStorage.getItem("token");

  try {
    dispatch(fetchNotificationsStart());
    const ws = new WebSocket(
      `${config.WS_BASE_URL}/notifications/${user.branchName}?jwt=${token}`
    );

    ws.onmessage = (e) => {
      const response = JSON.parse(e.data);

      dispatch(fetchNotificationsSuccess(response.data));
    };
  } catch (error) {
    dispatch(fetchNotificationsError(error.message));
  }
};

export const clearNotifications = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  try {
    dispatch(clearNotificationsStart());
    await apiClearNotifications({ branchName: user.branchName });
    dispatch(clearNotificationsSuccess());
  } catch (error) {
    dispatch(clearNotificationsError(error.message));
  }
};

export const updateNotification = ({ notificationId, index }) => async (
  dispatch
) => {
  try {
    dispatch(updateNotificationStart());
    const notifications = await apiUpdateNotifications({ notificationId });
    dispatch(updateNotificationSuccess(notifications));
  } catch (error) {
    dispatch(updateNotificationError(error.message));
  }
};
