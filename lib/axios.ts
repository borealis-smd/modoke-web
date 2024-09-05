import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTY5NzQ4NzgtYWUzNy00NTkyLTg2ZWItMjk1NTE1OTdjNjM0IiwiZmlyc3RfbmFtZSI6Ikpvw6NvIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzI1NTQ5Mjc3LCJleHAiOjE3MjYxNTQwNzd9.nSmsfcG8ltjePbsQdGAbj8XSqy6QHrHFW4oDMishzZc",
  },
});

export default api;
