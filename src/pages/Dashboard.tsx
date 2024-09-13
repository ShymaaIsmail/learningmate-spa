// components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import LearningCategoryDropdown from '../components/LearningCategoryDropdown';
import { LearningCategory } from '../types/learningTypes';
import LearningCourses from '../components/LearningCourses';
import getCourses  from '../api/services/coursesService';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4">
        <h1>Learning Category</h1>
        <LearningCategoryDropdown onSelect={handleSelect} />
      </div>
      <LearningCourses courses={courses} loading={loading} error={error} />
    </div>
  );
};

export default Dashboard;