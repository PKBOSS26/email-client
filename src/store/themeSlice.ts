import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '../types/theme';

const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme !== null) {
    return JSON.parse(savedTheme);
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState: ThemeState = {
  isDarkMode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;