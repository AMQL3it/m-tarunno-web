import apiService from "./apiService"; // Generic axios wrapper

const categoryService = {
  getAll: () => apiService.getAll("categories"),
  getById: (id) => apiService.getById("categories",id),
  create: (data) => apiService.create("categories", data),
  update: (id, data) => apiService.update("categories", id, data),
  delete: (id) => apiService.deleteById("categories", id),

  addTag: (id, data) => apiService.patch("categories", id, "tag", data),
  removeTag: (id, tagId) => apiService.deleteById("categories", id, `tag/${tagId}`),
};

export default categoryService;
