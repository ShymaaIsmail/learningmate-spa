// src/api/services/userService.ts
import axiosInstance from '../axiosInstance';

/**
 * Fetches the user profile data from the backend API.
 * @param userId The ID of the user whose profile is to be fetched.
 * @returns A promise that resolves to the user profile data.
 */
const getUserProfile = async (userId: string) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};


export default { getUserProfile };
