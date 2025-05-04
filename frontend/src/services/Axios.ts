import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.MODE === "development" ? import.meta.env.VITE_API_URL : "/api",
  withCredentials: false,
});

export default Axios;