import { useReducer } from 'react';

export const initialReservationState = {
  step: 1,
  roomId: 'suite-ocean-penthouse',
  roomTitle: 'Imperial Oceanfront Penthouse',
  pricePerNight: 1250,
  checkIn: '2026-10-25',
  checkOut: '2026-10-30',
  nights: 5,
  guests: 2,
  guestName: '',
  email: '',
  phone: '',
  specialRequests: '',
  addons: [],
  couponCode: '',
  discountPercent: 0,
  couponMessage: '',
  errors: {},
};

export const ADDONS_LIST = [
  { id: 'heli-transfer', name: 'Private Helicopter Airport Transfer', price: 650 },
  { id: 'champagne-arrival', name: 'Vintage Dom Pérignon upon Arrival', price: 380 },
  { id: 'butler-service', name: 'Dedicated 24/7 Royal Butler', price: 250 },
  { id: 'spa-pass', name: 'Unlimited Daily Thalassotherapy Spa Pass', price: 180 },
];

export const VALID_COUPONS = {
  AURELIA20: 20,
  WELCOME10: 10,
  ROYAL15: 15,
};

function reservationReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'SET_ROOM':
      return {
        ...state,
        roomId: action.payload.id,
        roomTitle: action.payload.title,
        pricePerNight: action.payload.price,
      };

    case 'SET_DATES': {
      const { checkIn, checkOut } = action.payload;
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end - start;
      const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
      return {
        ...state,
        checkIn,
        checkOut,
        nights: isNaN(nights) || nights < 1 ? 1 : nights,
      };
    }

    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' }, // clear error when typed
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };

    case 'TOGGLE_ADDON': {
      const addonId = action.payload;
      const exists = state.addons.includes(addonId);
      const updatedAddons = exists
        ? state.addons.filter((id) => id !== addonId)
        : [...state.addons, addonId];
      return {
        ...state,
        addons: updatedAddons,
      };
    }

    case 'APPLY_COUPON': {
      const code = (action.payload || '').trim().toUpperCase();
      if (VALID_COUPONS[code]) {
        return {
          ...state,
          couponCode: code,
          discountPercent: VALID_COUPONS[code],
          couponMessage: `Coupon "${code}" applied! ${VALID_COUPONS[code]}% Discount!`,
        };
      } else {
        return {
          ...state,
          couponCode: '',
          discountPercent: 0,
          couponMessage: 'Invalid promo code. Try "AURELIA20" or "WELCOME10"',
        };
      }
    }

    case 'RESET_BOOKING':
      return { ...initialReservationState };

    default:
      return state;
  }
}

export const useReservationReducer = (customInitial = {}) => {
  return useReducer(reservationReducer, { ...initialReservationState, ...customInitial });
};
