import axios from "axios";
const Base_Url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: Base_Url,
  withCredentials: true,
});
export default api;
