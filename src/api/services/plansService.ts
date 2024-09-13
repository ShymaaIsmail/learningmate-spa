// services/plansService.ts
import { number } from 'yup';
import useFetch from '../../hooks/useFetch';
import { PaginatedLearningPlan } from '../../types/learningTypes';

const getPlans = (page: number) => {
  const shouldFetch = !!number;
  const noOp = () => undefined;

  // Utilize the custom useFetch hook to fetch plans
  const { data, isLoading, error, fetchData } = useFetch<PaginatedLearningPlan>(
    shouldFetch ? {
      url: `/plans`,
      method: 'GET',
    } : null
  );

  // Ensure consistent type for paginatedPlans
  const paginatedPlans: PaginatedLearningPlan | null = data || null;

  return {
    paginatedPlans,
    loading: shouldFetch && isLoading,
    error: shouldFetch ? error : null,
    fetchPlans: shouldFetch ? fetchData : () => noOp(),
  };
};

export default getPlans;
