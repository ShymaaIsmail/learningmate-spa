import React, { useEffect, useState } from 'react';
import LearningCategoryDropdown from '../components/LearningCategoryDropdown';
import { LearningCategory } from '../types/learningTypes';
import LearningCourses from '../components/LearningCourses';
import getCourses from '../api/services/coursesService';

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<LearningCategory | null>(null);

  // Use the service hook
  const { courses, loading, error, fetchCourses } = getCourses(selectedCategory?.name || '');

  const handleSelect = (option: LearningCategory) => {
    setSelectedCategory(option);
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchCourses();
    }
  }, [selectedCategory, fetchCourses]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Learning Category</h1>
        <LearningCategoryDropdown onSelect={handleSelect} />
      </div>
      <div className="w-full max-w-6xl">
        <LearningCourses courses={courses} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Dashboard;
