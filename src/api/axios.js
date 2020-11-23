import axios from "axios";
import { LOCAL_API_BASE_URL } from "../consts";

const instance = axios.create({
  baseURL: LOCAL_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token) => {
  if (token) {
    instance.defaults.headers.common = { Authorization: `Bearer ${token}` };
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default instance;
