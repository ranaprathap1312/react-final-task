import { createSlice } from '@reduxjs/toolkit';

const loadSavedFavorites = () => {
  try {
    const saved = localStorage.getItem('aurelia_favorites');
    return saved ? JSON.parse(saved) : ['suite-ocean-penthouse', 'suite-royal-villa'];
  } catch {
    return ['suite-ocean-penthouse', 'suite-royal-villa'];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteIds: loadSavedFavorites(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter((favId) => favId !== id);
      } else {
        state.favoriteIds.push(id);
      }
      try {
        localStorage.setItem('aurelia_favorites', JSON.stringify(state.favoriteIds));
      } catch (e) {
        console.error(e);
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
      try {
        localStorage.setItem('aurelia_favorites', JSON.stringify(state.favoriteIds));
      } catch (e) {
        console.error(e);
      }
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
      try {
        localStorage.removeItem('aurelia_favorites');
      } catch (e) {
        console.error(e);
      }
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
