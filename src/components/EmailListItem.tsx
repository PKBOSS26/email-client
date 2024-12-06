import React from 'react';
import { format } from 'date-fns';
import { Email } from '../types/email';
import { EmailAvatar } from './EmailAvatar';
import { Star } from 'lucide-react';

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  isFavorite: boolean;
  isRead: boolean;
  onClick: () => void;
}

export const EmailListItem: React.FC<EmailListItemProps> = ({
  email,
  isSelected,
  isFavorite,
  isRead,
  onClick,
}) => {
  return (
    <div
      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors ${
        isSelected 
          ? 'bg-blue-50 dark:bg-blue-900/20' 
          : isRead 
            ? 'bg-gray-50 dark:bg-gray-800/50' 
            : 'bg-white dark:bg-gray-800'
      } hover:bg-blue-50 dark:hover:bg-blue-900/20`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <EmailAvatar name={email.from.name} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold ${
              isRead 
                ? 'text-gray-600 dark:text-gray-400' 
                : 'text-gray-900 dark:text-white'
            }`}>
              From: {email.from.name} ({email.from.email})
            </h3>
            <div className="flex items-center space-x-2">
              {isFavorite && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(email.date), 'dd/MM/yyyy hh:mm a')}
              </span>
            </div>
          </div>
          <h4 className={`font-medium mt-1 ${
            isRead 
              ? 'text-gray-500 dark:text-gray-400' 
              : 'text-gray-800 dark:text-gray-200'
          }`}>
            {email.subject}
          </h4>
          <p className={`text-sm mt-1 line-clamp-2 ${
            isRead 
              ? 'text-gray-500 dark:text-gray-400' 
              : 'text-gray-600 dark:text-gray-300'
          }`}>
            {email.short_description}
          </p>
        </div>
      </div>
    </div>
  );
};