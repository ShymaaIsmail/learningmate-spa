import React from 'react';
import { Course } from '../types/learningTypes'; // Import the Course type

interface LearningCoursesProps {
  courses: Course[]; // Define the type for the courses prop
  loading: boolean;
  error: string | null;
}

const LearningCourses: React.FC<LearningCoursesProps> = ({ courses, loading, error }) => {
  if (loading) {
    return <div className="text-center text-blue-500">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (courses.length === 0) {
    return <div className="text-center text-gray-500">No courses available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 p-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
        >
          {/* Course Image */}
          <img
            src={course.image_480x270}
            alt={course.title}
            className="w-full h-48 object-cover"
          />

          {/* Course Information */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-700 mb-4">{course.headline}</p>
            <p className="text-sm text-gray-500 mb-4">Source: {course.source}</p>
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-indigo-700"
            >
              View Course
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningCourses;