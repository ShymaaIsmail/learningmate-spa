import React from 'react';
import { LearningPlansProps } from '../types/learningTypes';

const LearningPlans: React.FC<LearningPlansProps> = ({
  paginatedPlans,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onAdd,
}) => {
  if (loading) {
    return <div className="text-center text-blue-500">Loading learning plans...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!paginatedPlans || paginatedPlans?.plans?.length === 0) {
    return <div className="text-center text-gray-500">No learning plans available.</div>;
  }

  return (
    <div className="p-4">
      {/* Add Plan Button */}
      <div className="flex justify-end mb-4">
        <button type='button'
          onClick={onAdd}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
        >
          Add Learning Plan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedPlans?.plans?.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
          >
            <img
              src={plan.image_480x270}
              alt={plan.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{plan.title}</h2>
              <p className="text-gray-700 mb-4">{plan.description}</p>
              <p className="text-sm text-gray-500 mb-4">Source: {plan.source}</p>
              <div className="flex justify-between">
                <button type='button'
                  onClick={() => onEdit(plan.id)}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Edit
                </button>
                <button type='button'
                  onClick={() => onDelete(plan.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button type='button'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 transition-opacity duration-300"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button type='button'
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
