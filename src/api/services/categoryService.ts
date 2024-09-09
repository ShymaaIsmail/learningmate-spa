/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import useFetch from '../../hooks/useFetch';
import { LearningCategory } from '../../types/learningTypes';

/**
 * Custom hook for fetching categories using useFetch.
 * @returns An object containing categories data, loading state, and error information.
 */
const getCategories = () => {
  const { data, isLoading, error, fetchData } = useFetch<LearningCategory[]>({
    url: '/categories',
    method: 'GET',
  });

  return {
    categories: data,
    isLoading,
    error,
    fetchData,
  };
};
export default getCategories;
