import React, { useState, useEffect } from 'react';
import { LearningPlan } from '../types/learningTypes';
import { getPlanById } from '../api/services/plansService'; // Ensure this is a regular function

interface AddEditLearningPlanProps {
  planId: number | null;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSave: (plan: LearningPlan) => void;
}

const AddEditLearningPlan: React.FC<AddEditLearningPlanProps> = ({
  planId,
  mode,
  onClose,
  onSave
}) => {
  const [plan, setPlan] = useState<LearningPlan | undefined>(undefined);
  const [newLink, setNewLink] = useState<{ url: string; title: string }>({ url: '', title: '' });

  useEffect(() => {
    if (mode === 'edit' && planId !== null) {
      const fetchPlan = async () => {
        try {
          const response = await getPlanById(planId);
          setPlan(response as LearningPlan);
        } catch (error) {
          console.error('Failed to fetch plan:', error);
        }
      };
      fetchPlan();
    }
  }, [planId, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setPlan((prevPlan) => {
      if (!prevPlan) {
        return { [name]: value } as unknown as LearningPlan;
      }
      return {
        ...prevPlan,
        [name]: value,
      };
    });
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink((prevLink) => ({
      ...prevLink,
      [name]: value
    }));
  };

  const handleAddLink = () => {
    if (plan) {
      setPlan({
        ...plan,
        course_links: [...(plan.course_links || []), newLink]
      });
      setNewLink({ url: '', title: '' });
    }
  };

  const handleRemoveLink = (url: string) => {
    if (plan) {
      setPlan({
        ...plan,
        course_links: plan.course_links?.filter(link => link.url !== url) || []
      });
    }
  };

  const handleSave = () => {
    if (planId !== null) {
      onSave({ ...plan, id: planId } as LearningPlan);
    } else {
      onSave({ ...plan } as LearningPlan);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{mode === 'edit' ? 'Edit Learning Plan' : 'Add Learning Plan'}</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={plan?.title || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={plan?.description || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              id="start_date"
              type="date"
              name="start_date"
              value={plan?.start_date || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              id="end_date"
              type="date"
              name="end_date"
              value={plan?.end_date || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Course Links</h3>
            {plan?.course_links && plan.course_links.length > 0 && (
              <ul className="mb-4">
                {plan.course_links.map(link => (
                  <li key={link.url} className="flex justify-between items-center mb-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {link.title}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(link.url)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                name="title"
                value={newLink.title}
                onChange={handleLinkChange}
                placeholder="Link Title"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="url"
                name="url"
                value={newLink.url}
                onChange={handleLinkChange}
                placeholder="Link URL"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <button
                type="button"
                onClick={handleAddLink}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add Link
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditLearningPlan;
