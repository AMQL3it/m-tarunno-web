import apiService from "./apiService"; // Generic axios wrapper

const coverService = {
  getAll: () => apiService.getAll("covers"),
  getById: (id) => apiService.getById("covers", id),
  create: (data) => apiService.create("covers", data),
  update: (id, data) => apiService.update("covers", id, data),
};

export default coverService;
