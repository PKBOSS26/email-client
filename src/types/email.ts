export interface Email {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
  body?: string;
}

export interface EmailState {
  emails: Email[];
  selectedEmail: Email | null;
  favorites: string[];
  readEmails: string[];
  filter: 'all' | 'favorites' | 'read' | 'unread';
  currentPage: number;
  loading: boolean;
  error: string | null;
}