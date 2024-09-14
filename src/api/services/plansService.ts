import useFetch from '../../hooks/useFetch';
import { PaginatedLearningPlan } from '../../types/learningTypes';

const getPlans = (page: number) => {
  const { data, isLoading, error, fetchData } = useFetch<PaginatedLearningPlan>({
    url: `/learning_plans?page=${page}`,
    method: 'GET',
  });


  // Return results
  return {
    paginatedPlans: data || null,
    loading: isLoading,
    error: error || null,
    fetchData
  };
};

export default getPlans;
