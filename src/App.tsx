import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import {
  fetchEmails,
  fetchEmailBody,
  setFilter,
  toggleFavorite,
  markAsRead,
  setSelectedEmail,
} from './store/emailSlice';
import { EmailListItem } from './components/EmailListItem';
import { EmailBody } from './components/EmailBody';
import { EmailFilter } from './components/EmailFilter';
import { ThemeToggle } from './components/ThemeToggle';
import { Loader2 } from 'lucide-react';
import { Email } from './types/email';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const {emails, selectedEmail, favorites, readEmails, filter, loading, error,} = useSelector((state: RootState) => state.email);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    dispatch(fetchEmails(1));
  }, [dispatch]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleEmailSelect = async (email: Email) => {
    dispatch(markAsRead(email.id));
    dispatch(setSelectedEmail(email));
    if (!email.body) {
      dispatch(fetchEmailBody(email.id));
    }
  };

  const filteredEmails = emails.filter((email) => {
    switch (filter) {
      case 'favorites':
        return favorites.includes(email.id);
      case 'read':
        return readEmails.includes(email.id);
      case 'unread':
        return !readEmails.includes(email.id);
      default:
        return true;
    }
  });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Email Client</h1>
          <ThemeToggle />
        </div>
      </header>

      <EmailFilter currentFilter={filter} onFilterChange={(newFilter) => dispatch(setFilter(newFilter))} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow ${selectedEmail ? 'w-1/2' : 'w-full'}`}>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredEmails.map((email) => (
                  <EmailListItem
                    key={email.id}
                    email={email}
                    isSelected={selectedEmail?.id === email.id}
                    isFavorite={favorites.includes(email.id)}
                    isRead={readEmails.includes(email.id)}
                    onClick={() => handleEmailSelect(email)}
                  />
                ))}
              </div>
            )}
          </div>

          {selectedEmail && (
            <div className="w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow">
              <EmailBody
                email={selectedEmail}
                isFavorite={favorites.includes(selectedEmail.id)}
                onToggleFavorite={() => dispatch(toggleFavorite(selectedEmail.id))}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;