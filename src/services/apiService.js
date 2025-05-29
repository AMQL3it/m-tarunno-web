import axios from "axios";

// Base URL from .env file or fallback
// const BASE_URL = "http://localhost:5001/api";
const BASE_URL = import.meta.env.VITE_API_URL + "/api";

// Get the stored token from localStorage (after login)
const getToken = () => localStorage.getItem("token");

// Create a dynamic Axios instance with Authorization header
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const apiService = {
  // 🔹 GET all items from endpoint: GET /news
  getAll: async (endpoint, config = {}) => {
    const res = await axios.get(`${BASE_URL}/${endpoint}`, {
      // ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },

  // 🔹 GET single item by ID: GET /news/12
  getById: async (endpoint, id, config = {}) => {
    const res = await axios.get(`${BASE_URL}/${endpoint}/${id}`, {
      // ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },

  // 🔹 GET items by query params: GET /news?is_hot=true&category=3
  getByQuery: async (endpoint, queryObj = {}, config = {}) => {
    const queryString = new URLSearchParams(queryObj).toString();
    const res = await axios.get(`${BASE_URL}/${endpoint}?${queryString}`, {
      // ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },

  // 🔹 POST: create new data → POST /news
  create: async (endpoint, data, config = {}) => {
    const res = await axios.post(`${BASE_URL}/${endpoint}`, data, {
      ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },

  // 🔹 PUT: full update → PUT /news/12
  update: async (endpoint, id, data, config = {}) => {
    const res = await axios.put(`${BASE_URL}/${endpoint}/${id}`, data, {
      ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },

  // 🔹 PATCH: partial update → PATCH /news/12
  patch: async (endpoint, id, extra = "", data, config = {}) => {
    const res = await axios.patch(
      `${BASE_URL}/${endpoint}/${id}/${extra}`,
      data,
      {
        ...getAuthHeaders(),
        ...config,
      }
    );
    return res.data;
  },

  // 🔹 DELETE: delete by ID → DELETE /news/12
  deleteById: async (endpoint, id, extra = "", config = {}) => {
    const res = await axios.delete(`${BASE_URL}/${endpoint}/${id}/${extra}`, {
      ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },
};

export default apiService;
