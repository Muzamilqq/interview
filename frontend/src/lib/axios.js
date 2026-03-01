import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://distinguished-caring-production-6c96.up.railway.app/api",
  withCredentials: true,
});

export default axiosInstance;
