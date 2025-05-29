import apiService from "./apiService"; // Generic axios wrapper

const tagService = {
  getAll: () => apiService.getAll("tags"),
  getById: (id) => apiService.getById("tags",id),
  create: (data) => apiService.create("tags", data),
  update: (id, data) => apiService.update("tags", id, data),
  delete: (id) => apiService.deleteById("tags", id),
};

export default tagService;
