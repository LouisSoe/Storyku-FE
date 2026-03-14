import axios from "axios";
import toast from "react-hot-toast";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      "Terjadi kesalahan, silakan coba lagi";

    // Jangan tampilkan toast untuk 404 (ditangani di komponen)
    if (error.response?.status !== 404) {
      toast.error(message);
    }

    return Promise.reject(new Error(message));
  },
);

export default httpClient;