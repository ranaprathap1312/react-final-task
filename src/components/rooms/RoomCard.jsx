import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Users, Maximize2, Bed, ArrowRight } from 'lucide-react';
import { toggleFavorite } from '../../store/favoritesSlice';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatCurrency';
import RatingStars from '../common/RatingStars';

export const RoomCard = ({ room, onQuickBook }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds);
  const { currency, currencyRates, currencySymbols } = useSelector((state) => state.ui);

  const isFavorite = favoriteIds.includes(room.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(room.id));
    if (isFavorite) {
      showToast(`Removed "${room.title}" from saved wishlist`, 'info');
    } else {
      showToast(`Added "${room.title}" to saved wishlist! ❤️`, 'success');
    }
  };

  const formattedPrice = formatPrice(room.price, currency, currencyRates, currencySymbols);

  return (
    <article className="glass-card room-card">
      <div className="room-card-img-wrap">
        <img
          src={room.image}
          alt={room.title}
          className="room-card-img"
          loading="lazy"
        />
        <div className="room-badge-top">
          <span className="badge badge-gold">{room.tag || room.categoryLabel}</span>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`room-fav-btn ${isFavorite ? 'is-favorite' : ''}`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={`Favorite ${room.title}`}
        >
          <Heart size={18} fill={isFavorite ? '#ffffff' : 'none'} />
        </button>
      </div>

      <div className="room-card-body">
        <div className="room-meta-row">
          <RatingStars rating={room.rating} reviewsCount={room.reviewsCount} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{room.categoryLabel}</span>
        </div>

        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.6rem' }}>
          <Link to={`/rooms/${room.id}`} style={{ color: 'inherit' }}>
            {room.title}
          </Link>
        </h3>

        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {room.description}
        </p>

        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Users size={14} color="var(--color-gold-500)" /> Up to {room.guests} Guests
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Bed size={14} color="var(--color-gold-500)" /> {room.beds.split('+')[0]}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Maximize2 size={14} color="var(--color-gold-500)" /> {room.size}
          </span>
        </div>

        <div className="room-price-row">
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>From</span>
            <div>
              <span className="room-price-val">{formattedPrice}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}> / night</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/rooms/${room.id}`} className="btn btn-secondary btn-sm" title="View suite details">
              Details
            </Link>
            {onQuickBook && (
              <button
                onClick={() => onQuickBook(room)}
                className="btn btn-primary btn-sm"
              >
                Book <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
