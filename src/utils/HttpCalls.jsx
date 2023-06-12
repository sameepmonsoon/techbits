import axios from "axios";
import { BASEURL } from "./Credentials";

import axiosInstance from "../Services/Axiosinstance";
const token = localStorage.getItem("locaToken");
// http calls using axios
function get(url) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
function post(url, data) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axiosInstance.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
function put(url, data) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axios.put(BASEURL + url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
function deleteData(url) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axios.delete(BASEURL + url, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const HttpCalls = { get, post, put, deleteData };
