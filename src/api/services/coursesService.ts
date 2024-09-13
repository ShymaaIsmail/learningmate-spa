// services/coursesService.ts
import useFetch from '../../hooks/useFetch';
import { Course } from '../../types/learningTypes';

const getCourses = (learningCategory: string) => {
  const shouldFetch = !!learningCategory;
  const noOp = () => undefined;

  // Utilize the custom useFetch hook to fetch courses
  const { data, isLoading, error, fetchData } = useFetch<Course[]>(
    shouldFetch ?{
    url: `/courses/${learningCategory}`,
    method: 'GET',
  }: null);

  // Fetch courses whenever the hook is called
  return {
    courses: data || [],
    loading: shouldFetch && isLoading,
    error: shouldFetch ? error : null,
    fetchCourses: shouldFetch ? fetchData : () => noOp(),
  };
};
export default getCourses;