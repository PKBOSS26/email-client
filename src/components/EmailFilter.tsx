import React from 'react';
import { EmailState } from '../types/email';

interface EmailFilterProps {
  currentFilter: EmailState['filter'];
  onFilterChange: (filter: EmailState['filter']) => void;
}

export const EmailFilter: React.FC<EmailFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filters: Array<{ value: EmailState['filter']; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
    { value: 'favorites', label: 'Favorites' },
  ];

  return (
    <div className="flex space-x-2 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentFilter === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};