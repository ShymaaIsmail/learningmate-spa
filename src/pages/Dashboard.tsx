import React from 'react';
import LearningCategoryDropdown from '../components/LearningCategoryDropdown';
import LearningCourses from '../components/LearningCourses';
import { LearningCategory } from '../types/learningTypes';


const Dashboard: React.FC = () => {
  const handleSelect = (option: LearningCategory) => {
    // eslint-disable-next-line no-alert
    alert(`Selected option: ${option}`);
  };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="p-4">
    <h1>Learning Category</h1>
      <LearningCategoryDropdown 
        onSelect={handleSelect} 
      />
    </div>
    <LearningCourses />

    </div>
    )};

export default Dashboard;
