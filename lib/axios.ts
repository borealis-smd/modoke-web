import axios from "axios";

const api = axios.create({
  baseURL: "http://modoke-api-production.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
