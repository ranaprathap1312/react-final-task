import { createSlice } from '@reduxjs/toolkit';

const currencyRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  AED: 3.67,
};

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  AED: 'AED ',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    currency: 'USD',
    currencyRates,
    currencySymbols,
    isMobileMenuOpen: false,
    conceptBannerVisible: true,
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleConceptBanner: (state) => {
      state.conceptBannerVisible = !state.conceptBannerVisible;
    },
  },
});

export const { setCurrency, toggleMobileMenu, closeMobileMenu, toggleConceptBanner } = uiSlice.actions;
export default uiSlice.reducer;
