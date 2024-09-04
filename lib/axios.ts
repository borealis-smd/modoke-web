import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzVhMzliM2QtN2Q2Ny00OTg3LThjYWQtZjg0YjczNDg4MGI1IiwiZmlyc3RfbmFtZSI6Ikpvw6NvIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzI1NDY5MDgxLCJleHAiOjE3MjYwNzM4ODF9.LCoz01r6ZIJe7r7fZaKO8sFcEgzD-bS-iI-va5OEkv4",
  },
});

export default api;
