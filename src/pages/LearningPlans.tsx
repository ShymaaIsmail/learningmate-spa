import React, { useEffect, useState } from 'react';
import LearningPlans from '../components/LearningPlanList';
import { PaginatedLearningPlan } from '../types/learningTypes';
import getPlans from '../api/services/plansService';

const LearningPlansPage: React.FC = () => {
  const [plans, setPlans] = useState<PaginatedLearningPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch learning plans
  const fetchPlans = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
    const {paginatedPlans }= await getPlans(page);
      setPlans(paginatedPlans);
      setTotalPages(paginatedPlans?.totalPages ?? 1);
    } catch (errors) {
      setError('Failed to load learning plans.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans(currentPage);
  }, [currentPage]);

  const handleAdd = () => {
    console.log('Add new plan');
  };

  const handleEdit = (planId: number) => {
    console.log(`Edit plan ${planId}`);
  };

  const handleDelete = (planId: number) => {
    console.log(`Delete plan ${planId}`);
    fetchPlans(currentPage);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Learning Plans</h1>
      <LearningPlans
        paginatedPlans={plans}
        loading={loading}
        error={error}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default LearningPlansPage;
