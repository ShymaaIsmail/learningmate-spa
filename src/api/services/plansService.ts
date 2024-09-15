import axiosInstance from '../axiosInstance';
import useFetch from '../../hooks/useFetch';
import { LearningPlan } from '../../types/learningTypes';

const API_BASE_URL = '/learning_plans/';

// Fetch plans for the given page
const getPlans = (page: number) => {
  const { data, isLoading, error, fetchData } = useFetch<LearningPlan[]>({
    url: `${API_BASE_URL}?page=${page}`,
    method: 'GET',
  });

  return {
    plans: data || null,
    loading: isLoading,
    error: error || null,
    fetchData,
  };
};

// Add a new learning plan
const addPlan = async (planData: any) => {
  try {
    const response = await axiosInstance.post(API_BASE_URL, planData);
    return response.data;
  } catch (error) {
    console.error('Error adding learning plan:', error);
    throw new Error('Failed to add learning plan');
  }
};

// Edit an existing learning plan
const editPlan = async (id: number, planData: any) => {
  try {
    const response = await axiosInstance.put(`${API_BASE_URL}${id}/`, planData);
    return response.data;
  } catch (error) {
    console.error('Error editing learning plan:', error);
    throw new Error('Failed to edit learning plan');
  }
};

// Delete a learning plan
const deletePlan = async (id: number) => {
  try {
    await axiosInstance.delete(`${API_BASE_URL}${id}/`);
  } catch (error) {
    console.error('Error deleting learning plan:', error);
    throw new Error('Failed to delete learning plan');
  }
};

const getPlanById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting learning plan:', error);
    throw new Error('Failed to delete learning plan');
  }
};
export {
  getPlans,
  addPlan,
  editPlan,
  deletePlan,
  getPlanById
};
