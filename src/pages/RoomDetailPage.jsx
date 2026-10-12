import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { roomsData } from '../data/roomsData';
import { toggleFavorite } from '../store/favoritesSlice';
import { useToast } from '../context/ToastContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice } from '../utils/formatCurrency';
import RatingStars from '../components/common/RatingStars';
import BookingFormModal from '../components/bookings/BookingFormModal';
import ConceptBadge from '../components/common/ConceptBadge';
import {
  Heart,
  Users,
  Maximize2,
  Bed,
  Check,
  ShieldCheck,
  ArrowLeft,
  Calendar,
  Share2
} from 'lucide-react';

export const RoomDetailPage = ({ onBookingCreated }) => {
  // React Router DOM: useParams hook
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const favoriteIds = useSelector((state) => state.favorites.favoriteIds);
  const { currency, currencyRates, currencySymbols } = useSelector((state) => state.ui);

  const room = roomsData.find((r) => r.id === roomId);

  useDocumentTitle(room ? room.title : 'Suite Not Found');

  // Local state for active gallery image and booking modal
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quick estimator state
  const [calcNights, setCalcNights] = useState(3);
  const [calcGuests, setCalcGuests] = useState(2);

  if (!room) {
    return (
      <div className="section-padding container" style={{ textAlign: 'center' }}>
        <h2>Accommodation Not Found</h2>
        <p style={{ margin: '1rem 0 2rem 0' }}>The requested suite identifier "{roomId}" does not exist.</p>
        <Link to="/rooms" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Suites Collection
        </Link>
      </div>
    );
  }

  const isFavorite = favoriteIds.includes(room.id);
  const formattedNightPrice = formatPrice(room.price, currency, currencyRates, currencySymbols);
  const estimatedTotal = formatPrice(room.price * calcNights, currency, currencyRates, currencySymbols);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(room.id));
    if (isFavorite) {
      showToast(`Removed "${room.title}" from saved wishlist`, 'info');
    } else {
      showToast(`Added "${room.title}" to saved wishlist! ❤️`, 'success');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Page link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="section-padding">
      <div className="container">
        {/* Concept Inspector Banner */}
        <ConceptBadge
          activeConcepts={[
            'useParams',
            'React Router DOM',
            'Redux Toolkit',
            'useState',
            'useDocumentTitle',
            'Conditional Rendering',
            'List Rendering',
            'Responsive UI'
          ]}
        />

        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <Link to="/rooms" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-gold)' }}>
              <ArrowLeft size={16} /> All Suites
            </Link>
            <span>/</span>
            <span>{room.categoryLabel}</span>
            <span>/</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{room.title}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={handleShare} className="btn btn-secondary btn-sm" title="Share Suite Link">
              <Share2 size={15} /> Share
            </button>
            <button
              onClick={handleFavoriteClick}
              className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-secondary'}`}
              title="Save to favorites"
            >
              <Heart size={15} fill={isFavorite ? '#ffffff' : 'none'} />
              {isFavorite ? 'Saved in Wishlist' : 'Save to Wishlist'}
            </button>
          </div>
        </div>

        {/* Header Title & Rating */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>{room.tag}</span>
          <h1 style={{ marginBottom: '0.8rem' }}>{room.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <RatingStars rating={room.rating} reviewsCount={room.reviewsCount} size={18} />
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              <strong>URL Parameter (useParams):</strong> <code>:roomId = {roomId}</code>
            </span>
          </div>
        </div>

        {/* Gallery Section */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ height: '520px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '1rem', border: '1px solid var(--border-subtle)' }}>
            <img
              src={room.gallery ? room.gallery[activeImageIndex] : room.image}
              alt={room.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {room.gallery && room.gallery.length > 1 && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              {room.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '120px',
                    height: '80px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '3px solid var(--color-gold-500)' : '2px solid transparent',
                    opacity: activeImageIndex === idx ? 1 : 0.65,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Layout: Details vs Reservation Card */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '3rem', alignItems: 'start' }}>
          {/* Left Details */}
          <div>
            <div style={{ display: 'flex', gap: '2rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Users size={20} color="var(--color-gold-500)" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Capacity</div>
                  <strong>Up to {room.guests} Guests</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Bed size={20} color="var(--color-gold-500)" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bed Configuration</div>
                  <strong>{room.beds}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Maximize2 size={20} color="var(--color-gold-500)" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Residence Size</div>
                  <strong>{room.size}</strong>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The Sanctuary Experience</h3>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              {room.description}
            </p>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>Exclusive Privileges & Amenities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem', marginBottom: '2.5rem' }}>
              {room.amenities.map((amenity, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.94rem' }}>
                  <span style={{ color: 'var(--color-gold-500)', display: 'flex' }}><Check size={16} /></span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--bg-muted)', padding: '1.4rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ShieldCheck size={28} color="var(--color-emerald)" />
              <div>
                <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Guarantee & Cancellation Policy</strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{room.cancellationPolicy}</span>
              </div>
            </div>
          </div>

          {/* Right Sticky Booking Calculator */}
          <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nightly Rate</span>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-gold)', fontFamily: 'var(--font-serif)' }}>
                  {formattedNightPrice}
                </div>
              </div>
              <span className="badge badge-emerald">Available</span>
            </div>

            {/* Quick Estimator Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Stay Duration</label>
                <select
                  value={calcNights}
                  onChange={(e) => setCalcNights(Number(e.target.value))}
                  className="form-select"
                >
                  {[1, 2, 3, 4, 5, 7, 10, 14].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Night' : 'Nights'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Total Guests</label>
                <select
                  value={calcGuests}
                  onChange={(e) => setCalcGuests(Number(e.target.value))}
                  className="form-select"
                >
                  {[...Array(room.guests)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total Estimate */}
            <div style={{ background: 'var(--bg-muted)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                <span>{formattedNightPrice} × {calcNights} Nights</span>
                <strong>{estimatedTotal}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-emerald)' }}>
                <span>Complimentary Breakfast & Butler</span>
                <strong>Included</strong>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginBottom: '0.8rem' }}
            >
              <Calendar size={18} /> Reserve This Suite
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              No immediate charge. Full reservation customization available in next step.
            </p>
          </div>
        </div>

        {/* Booking Form Modal */}
        <BookingFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialRoom={room}
          onBookingCreated={onBookingCreated}
        />
      </div>
    </div>
  );
};

export default RoomDetailPage;
