import axios from "axios";
import { config } from "../consts";

const instance = axios.create({
  baseURL: config.API_BASE_URL,
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
