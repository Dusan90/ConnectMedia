import axios from "axios";
import {
  requestHandler,
  successHandler,
  errorHandler,
} from "../interceptors/index";
// import { BASE_URL } from "../../utils/Constants";
const BASE_URL = process.env.REACT_APP_API_URL_PREFIX ? "BASE_URL" : "";

//add your BASE_URL to Constants file
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: sessionStorage.getItem("token"),
  },
});

// Handle request process
axiosInstance.interceptors.request.use((request) => requestHandler(request));
// Handle response process
axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
