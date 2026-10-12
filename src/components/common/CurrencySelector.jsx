import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../../store/uiSlice';

export const CurrencySelector = () => {
  const dispatch = useDispatch();
  const currentCurrency = useSelector((state) => state.ui.currency);
  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AED'];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <select
        value={currentCurrency}
        onChange={(e) => dispatch(setCurrency(e.target.value))}
        className="form-select"
        style={{
          padding: '0.4rem 0.8rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          background: 'var(--bg-muted)',
          borderColor: 'var(--border-subtle)',
          borderRadius: 'var(--radius-pill)',
          cursor: 'pointer',
          color: 'var(--text-main)',
        }}
        aria-label="Select Currency"
      >
        {currencies.map((curr) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
