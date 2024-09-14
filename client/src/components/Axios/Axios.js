import axios from "axios";

const axiosSource = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default axiosSource;
