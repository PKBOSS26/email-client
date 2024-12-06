import React from 'react';
import { Email } from '../types/email';
import { format } from 'date-fns';
import { EmailAvatar } from './EmailAvatar';
import { Star } from 'lucide-react';

interface EmailBodyProps {
  email: Email;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const EmailBody: React.FC<EmailBodyProps> = ({
  email,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-800 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <EmailAvatar name={email.from.name} className="w-12 h-12" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {email.subject}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                From: {email.from.name} ({email.from.email})
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleFavorite}
              className="flex items-center space-x-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400 dark:text-gray-500'}`} />
              <span className="text-gray-700 dark:text-gray-300">{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(email.date), 'dd/MM/yyyy hh:mm a')}
            </span>
          </div>
        </div>
        <div className="prose dark:prose-invert text-gray-700 dark:text-gray-300 max-w-none" dangerouslySetInnerHTML={{ __html: email.body || '' }} />
      </div>
    </div>
  );
};