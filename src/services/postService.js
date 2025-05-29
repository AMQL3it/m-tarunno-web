import apiService from "./apiService"; // Generic axios wrapper

const postService = {
  getAll: () => apiService.getAll("posts"),
  getAllByCategory: (id) => apiService.getAll(`posts/category/${id}`),
  getById: (id) => apiService.getById("posts", id),
  create: (data, config) => apiService.create("posts", data, config),
  update: (id, data) => apiService.update("posts", id, data),
  delete: (id) => apiService.deleteById("posts", id),
};

export default postService;
