import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7050";

export const threeBeastsBackend = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
