import React from 'react';
import { LearningPlan } from '../types/learningTypes';

interface Props {
  plans: LearningPlan[] | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (planId: number) => void;
  onDelete: (planId: number) => void;
  onAdd: () => void;
}

const LearningPlans: React.FC<Props> = ({
  plans,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onAdd
}) => {
  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 text-left">
        <button
          type="button"
          onClick={onAdd}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Add New Plan
        </button>
      </div>
      <ul className="space-y-4">
        {plans && plans.length > 0 ? (
          plans.map(plan => (
            <li key={plan.id} className="border rounded-lg shadow-lg p-6 bg-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-3 text-gray-800">{plan.title}</h2>
              <p className="text-gray-700 mb-3">{plan.description}</p>
              <p className="text-gray-600 mb-2"><strong>Start Date:</strong> {plan.start_date}</p>
              <p className="text-gray-600 mb-4"><strong>End Date:</strong> {plan.end_date}</p>
              {plan.course_links && plan.course_links.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Course Links:</h3>
                  <ul className="space-y-2">
                    {plan.course_links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => onEdit(plan.id)}
                className="py-2 px-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(plan.id)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
          
          ))
        ) : (
          <p className="text-center">No learning plans available.</p>
        )}
      </ul>
      <div className="mt-4 flex justify-center space-x-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="py-2 px-4 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="py-2 px-4 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LearningPlans;
