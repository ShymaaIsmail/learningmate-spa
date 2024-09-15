import React, { useEffect, useState } from 'react';
import LearningPlans from '../components/LearningPlanList';
import { LearningPlan } from '../types/learningTypes';
import { getPlans, addPlan, editPlan, deletePlan } from '../api/services/plansService';

const LearningPlansPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { plans, loading, error: errorResult, fetchData } = getPlans(currentPage);

  useEffect(() => {
    fetchData();
  }, [currentPage, fetchData]);

  useEffect(() => {
    if (plans) {
      setTotalPages(1);
    }
  }, [plans]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = async (planId: number) => {
    try {
      setIsProcessing(true);
      setApiError(null);
      const updatedPlan = { title: 'Updated Plan', description: 'Updated description', start_date: '2024-01-01', end_date: '2024-12-31' };
      await editPlan(planId, updatedPlan);
      fetchData();
    } catch (error: any) {
      setApiError(error.message || 'Failed to edit learning plan.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (planId: number) => {
    try {
      setIsProcessing(true);
      setApiError(null);
      await deletePlan(planId);
      fetchData();
    } catch (error: any) {
      setApiError(error.message || 'Failed to delete learning plan.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAdd = async () => {
    try {
      setIsProcessing(true);
      setApiError(null);
      const newPlan = { title: 'New Plan', description: 'New plan description', start_date: '2024-01-01', end_date: '2024-2-2'};
      await addPlan(newPlan);
      fetchData();
    } catch (error: any) {
      setApiError(error.message || 'Failed to add learning plan.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Learning Plans</h1>
      {apiError && <div className="text-red-500 mb-4">{apiError}</div>}
      <LearningPlans
        plans={plans}
        loading={loading || isProcessing}
        error={errorResult || apiError}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default LearningPlansPage;
