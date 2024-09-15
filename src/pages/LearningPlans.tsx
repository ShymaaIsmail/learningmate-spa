import React, { useEffect, useState } from 'react';
import LearningPlans from '../components/LearningPlanList';
import { LearningPlan } from '../types/learningTypes';
import { getPlans, addPlan, editPlan, deletePlan } from '../api/services/plansService';
import AddEditLearningPlan from '../components/AddEditLearningPlan';

const LearningPlansPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<'add' | 'edit'>('add');
  const [selectedPlanId, setSelectedPlanId] = useState<number>(0);

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

  const handleEdit = (planId: number) => {
    setEditMode('edit');
    setSelectedPlanId(planId);
    setIsModalOpen(true);
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

  const handleAdd = () => {
    setEditMode('add');
    setSelectedPlanId(0);
    setIsModalOpen(true);
  };

  const handleSave = async (plan: LearningPlan) => {
    try {
      setIsProcessing(true);
      setApiError(null);
      if (editMode === 'edit' && selectedPlanId) {
        await editPlan(selectedPlanId, plan);
      } else {
        await addPlan(plan);
      }
      fetchData();
      setIsModalOpen(false);
    } catch (error: any) {
      setApiError(error.message || `Failed to ${editMode === 'edit' ? 'edit' : 'add'} learning plan.`);
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
      {isModalOpen && (
        <AddEditLearningPlan
          planId={selectedPlanId}
          mode={editMode}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default LearningPlansPage;
