import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL + "/api";
const getAuthHeaders = () => ({
  headers: {
    // Authorization: `Bearer ${getToken()}`
  },
});

const authService = {
  // codeSending: (data) => apiService.create("auth/otp/send", data),
  // codeVerify: (data) => apiService.create("auth/otp/verify", data),
  login: async (data, config = {}) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, data, {
      ...getAuthHeaders(),
      ...config,
    });
    // console.log(res.data);

    return res.data;
  },

  register: async (data, config = {}) => {
    const res = await axios.post(`${BASE_URL}/auth/register`, data, {
      ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },

  codeSending: async (data, config = {}) => {
    const res = await axios.post(`${BASE_URL}/auth/otp/send`, data, {
      ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },
  codeVerify: async (data, config = {}) => {
    const res = await axios.post(`${BASE_URL}/auth/otp/verify`, data, {
      ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },

  logout: async () => {
    const token = localStorage.getItem("token");
    // const payload = token.split(".")[1];
    // const decoded = JSON.parse(atob(payload));
    const res = await axios.post(`${BASE_URL}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  //   delete: (id) => apiService.deleteById("posts", id),
};

export default authService;
