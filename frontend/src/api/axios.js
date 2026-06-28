import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://azentrix-fullstack-task2-w51b.onrender.com/api",
  withCredentials: true,
});

export default api;
