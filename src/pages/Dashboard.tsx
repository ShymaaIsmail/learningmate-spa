import React from 'react';
import LearningCategory from '../components/LearningCategory';
import LearningCourses from '../components/LearningCourses';


const Dashboard: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <LearningCategory />
    <LearningCourses />

    </div>
  );

export default Dashboard;
