import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, reviewsCount = null, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <div style={{ display: 'inline-flex', gap: '2px', color: '#f59e0b' }}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            fill={i < fullStars || (i === fullStars && hasHalfStar) ? '#f59e0b' : 'none'}
            stroke="#f59e0b"
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
        {rating.toFixed(2)}
      </span>
      {reviewsCount !== null && (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ({reviewsCount} reviews)
        </span>
      )}
    </div>
  );
};

export default RatingStars;
