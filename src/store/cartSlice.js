import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [
      {
        id: 'exp-spa-ayurveda',
        title: 'Shirodhara & Abhyanga Ayurvedic Ritual',
        category: 'Spa & Wellness',
        price: 280,
        guests: 2,
        time: '14:00',
        date: '2026-10-15',
      },
    ],
  },
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.guests += action.payload.guests || 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
