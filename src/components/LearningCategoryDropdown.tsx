// src/components/LearningCategoryDropdown.tsx
import React, { useState, useMemo } from 'react';
import { LearningCategory } from '../types/learningTypes';
import getCategories from '../api/services/categoryService';

interface LearningCategoryDropdownProps {
  onSelect: (category: LearningCategory) => void;
}

const LearningCategoryDropdown: React.FC<LearningCategoryDropdownProps> = ({ onSelect }) => {
  const { categories, isLoading, error, fetchData } = getCategories();

  const [selectedCategory, setSelectedCategory] = useState<LearningCategory | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch categories when the component mounts or when needed
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (category: LearningCategory) => {
    setSelectedCategory(category);
    onSelect(category);
    setIsOpen(false);
  };

  // Memoize the categories to avoid unnecessary re-renders
  const memoizedCategories = useMemo(() => categories ?? [], [categories]);

  // Render loading, error, or categories
  const renderDropdownContent = () => {
    if (isLoading) {
      return <li className="px-4 py-2 text-gray-500">Loading...</li>;
    }

    if (error) {
      return <li className="px-4 py-2 text-red-500">{error}</li>;
    }

    return memoizedCategories.map((category) => (
      <li
        key={category.id}
        onClick={() => handleSelect(category)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSelect(category);
          }
        }}
        role="option"
        aria-selected={selectedCategory?.id === category.id ? 'true' : 'false'}
        tabIndex={0} // Makes the <li> element focusable
        className="cursor-pointer px-4 py-2 hover:bg-indigo-100"
      >
        {category.name}
      </li>
    ));
  };

  return (
    <div className="relative inline-block w-64">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center"
      >
        <span>{selectedCategory ? selectedCategory.name : 'Select a category'}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox" tabIndex={0}
          aria-activedescendant={selectedCategory ? `category-${selectedCategory.id}` : undefined}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {renderDropdownContent()}
        </ul>
      )}
    </div>
  );
};

export default LearningCategoryDropdown;
