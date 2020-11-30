import axios from "./axios";

export const login = async (credentials) => {
  const response = await axios.post(`/auth/login`, credentials);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error.message);
  }
};

export const loginWithToken = async () => {
  const response = await axios.get(`/users/token`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error.message);
  }
};
