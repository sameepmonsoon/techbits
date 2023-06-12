import axiosInstance from "../Services/Axiosinstance";

function get(url) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axiosInstance.get(url);
}
function post(url, data) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axiosInstance.post(url, data);
}
function put(url, data) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axiosInstance.put(url, data);
}
function deleteData(url) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axiosInstance.delete(url);
}

export const HttpCalls = { get, post, put, deleteData };
