import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EmailState, Email } from '../types/email';
import { api } from '../services/api';

const loadPersistedState = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const readEmails = JSON.parse(localStorage.getItem('readEmails') || '[]');
  return { favorites, readEmails };
};

const initialState: EmailState = {
  emails: [],
  selectedEmail: null,
  favorites: loadPersistedState().favorites,
  readEmails: loadPersistedState().readEmails,
  filter: 'all',
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchEmails = createAsyncThunk(
  'email/fetchEmails',
  async (page: number) => {
    return await api.getEmails(page);
  }
);

export const fetchEmailBody = createAsyncThunk(
  'email/fetchEmailBody',
  async (id: string) => {
    return await api.getEmailBody(id);
  }
);

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<EmailState['filter']>) => {
      state.filter = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const emailId = action.payload;
      const index = state.favorites.indexOf(emailId);
      if (index === -1) {
        state.favorites.push(emailId);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const emailId = action.payload;
      if (!state.readEmails.includes(emailId)) {
        state.readEmails.push(emailId);
        localStorage.setItem('readEmails', JSON.stringify(state.readEmails));
      }
    },
    setSelectedEmail: (state, action: PayloadAction<Email | null>) => {
      state.selectedEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.emails = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch emails';
      })
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        if (state.selectedEmail) {
          state.selectedEmail = {
            ...state.selectedEmail,
            body: action.payload,
          };
        }
      });
  },
});

export const { setFilter, toggleFavorite, markAsRead, setSelectedEmail } = emailSlice.actions;
export default emailSlice.reducer;