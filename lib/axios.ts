import axios from "axios";

const api = axios.create({
  baseURL: "https://modoke-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
