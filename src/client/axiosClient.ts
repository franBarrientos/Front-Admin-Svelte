import axios from "axios";
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_URL_BACK,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }
});
