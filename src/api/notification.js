import axios from "./axios";

export const clearNotifications = async ({ branchName }) => {
  const response = await axios.delete(`/notifications/${branchName}`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const updateNotification = async ({ notificationId }) => {
  const response = await axios.patch(`/notifications/${notificationId}`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};
