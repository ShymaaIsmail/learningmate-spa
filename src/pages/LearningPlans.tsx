import React from 'react';
import { LearningPlan } from '../types/learningTypes';

interface LearningPlansProps {
  plans: LearningPlan[]; // Define the type for the plans prop
  loading: boolean;
  error: string | null;
  onEdit: (planId: number) => void; // Function to handle editing a plan
  onDelete: (planId: number) => void; // Function to handle deleting a plan
  onAdd: () => void; // Function to handle adding a new plan
  currentPage: number; // Current page number
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Function to handle page changes
}

const LearningPlans: React.FC<LearningPlansProps> = ({
  plans,
  loading,
  error,
  onEdit,
  onDelete,
  onAdd,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (loading) {
    return <div className="text-center text-blue-500">Loading learning plans...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (plans.length === 0) {
    return <div className="text-center text-gray-500">No learning plans available.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Learning Plans</h1>
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
        >
          Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
          >
            {/* Plan Image */}
            <img
              src={plan.image_480x270}
              alt={plan.title}
              className="w-full h-48 object-cover"
            />

            {/* Plan Information */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{plan.title}</h2>
              <p className="text-gray-700 mb-4">{plan.description}</p>
              <p className="text-sm text-gray-500 mb-4">Source: {plan.source}</p>
              <div className="flex justify-between items-center">
                <a
                  href={plan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:text-indigo-700"
                >
                  View Plan
                </a>
                <div className="space-x-2">
                  <button
                    onClick={() => onEdit(plan.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-2 rounded transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(plan.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 transition-opacity duration-300"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 transition-opacity duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LearningPlans;
