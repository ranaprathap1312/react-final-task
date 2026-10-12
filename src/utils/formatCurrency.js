export const formatPrice = (amountInUSD, currency = 'USD', rates = { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5, AED: 3.67 }, symbols = { USD: '$', EUR: '€', GBP: '£', INR: '₹', AED: 'AED ' }) => {
  const rate = rates[currency] || 1;
  const symbol = symbols[currency] || '$';
  const converted = Math.round(amountInUSD * rate);

  return `${symbol}${converted.toLocaleString()}`;
};
