/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import useFetch from '../../hooks/useFetch';
import { Course } from '../../types/learningTypes';

/**
 * Custom hook for fetching categories using useFetch.
 * @returns An object containing categories data, loading state, and error information.
 */
const getCourses = (learningCategory: string) => {
  const { data, isLoading, error, fetchData } = useFetch<Course[]>({
    url: `/courses/${learningCategory}`,
    method: 'GET',
  });

  return {
    courses: data,
    isLoading,
    error,
    fetchData,
  };
};
export default getCourses;
