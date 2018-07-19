import axios from "axios";

export default function execute() {
  axios.interceptors.request.use(
    request => {
      const token = window.localStorage.getItem("adminToken");
      if (token) {
        request.headers["authorization"] = `Bearer ${token}`;
      }
      return request;
    },
    err => {
      return Promise.reject(err);
    }
  );
}
