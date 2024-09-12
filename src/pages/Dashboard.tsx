import React, { useState } from 'react';
import LearningCategoryDropdown from '../components/LearningCategoryDropdown';
import { LearningCategory, Course } from '../types/learningTypes';
import LearningCourses from '../components/LearningCourses';
import getCourses from '../api/services/coursesService';


const Dashboard: React.FC = () => {
  const [coursesList, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false);
  const [errorMessage, setError] = useState<string | null>(null);

  const handleSelect = async (option: LearningCategory) => {
    alert(`Selected option: ${option.name}`); // eslint-disable-line no-alert

    // Call getCourses to fetch courses
    const { courses, isLoading, error, fetchData } = getCourses(option.name);

    setLoading(isLoading);
    setError(error);

    if (fetchData) {
      await fetchData();
      setCourses(courses || []);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4">
        <h1>Learning Category</h1>
        <LearningCategoryDropdown onSelect={handleSelect} />
      </div>
      <LearningCourses courses={coursesList} loading={loading} error={errorMessage} />
    </div>
  );
};

export default Dashboard;
