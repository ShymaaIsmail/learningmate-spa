import React, { useEffect, useState } from 'react';
import LearningPlans from '../components/LearningPlanList';
import { PaginatedLearningPlan } from '../types/learningTypes';
import getPlans from '../api/services/plansService'

const LearningPlansPage: React.FC = () => {
  const [plans, setPlans] = useState<PaginatedLearningPlan | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { paginatedPlans,  loading, error, fetchData }  = getPlans(currentPage);


  // Fetch plans when component mounts or when the page changes
  useEffect(() => {
    fetchData(); // Ensure fetchData is only called once per page load or page change
  }, [currentPage, fetchData]); // Fetch only when currentPage changes

  // Update plans and total pages when data changes
  useEffect(() => {
    if (paginatedPlans) {
      setPlans(paginatedPlans);
      setTotalPages(paginatedPlans.totalPages ?? 1);
    }
  }, [paginatedPlans]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handlers for edit, delete, and add
  const handleEdit = (planId: number) => {
    console.log(`Editing plan with id ${planId}`);
    // Add your edit logic here
  };

  const handleDelete = (planId: number) => {
    console.log(`Deleting plan with id ${planId}`);
    // Add your delete logic here
  };

  const handleAdd = () => {
    console.log('Adding a new learning plan');
    // Add your add logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Learning Plans</h1>
      <LearningPlans
        paginatedPlans={plans}
        loading={loading}
        error={error ? 'Failed to load learning plans.' : null}
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
