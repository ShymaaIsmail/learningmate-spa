// src/api/services/categoryService.ts
import axiosInstance from '../axiosInstance';

/**
 * Fetches categories from the backend API.
 * @returns A promise that resolves to the list of categories.
 */
const getCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data;
};

export default { getCategories };
