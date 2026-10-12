import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { roomsData } from '../data/roomsData';
import { removeFavorite, clearFavorites } from '../store/favoritesSlice';
import { removeItem, clearCart } from '../store/cartSlice';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatCurrency';
import ConceptBadge from '../components/common/ConceptBadge';
import { Heart, Trash2, Calendar, ShoppingBag, ArrowRight, Check } from 'lucide-react';

export const FavoritesPage = () => {
  useDocumentTitle('Saved Wishlist & Itinerary (Redux Store)');
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Read Redux slices using useSelector
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds);
  const cartItems = useSelector((state) => state.cart.items);
  const { currency, currencyRates, currencySymbols } = useSelector((state) => state.ui);

  // Match room data from favoriteIds
  const savedRooms = roomsData.filter((r) => favoriteIds.includes(r.id));

  // Compute cart total
  const cartTotalUSD = cartItems.reduce((acc, item) => acc + item.price * (item.guests || 1), 0);
  const formattedCartTotal = formatPrice(cartTotalUSD, currency, currencyRates, currencySymbols);

  const handleCheckoutItinerary = () => {
    showToast('Your custom resort experiences itinerary has been confirmed with the Butler Desk!', 'success');
    dispatch(clearCart());
  };

  return (
    <div className="section-padding">
      <div className="container">
        {/* Concept Inspector Banner */}
        <ConceptBadge
          activeConcepts={[
            'Redux Toolkit',
            'useSelector & useDispatch',
            'Components & Props',
            'Conditional Rendering',
            'List Rendering',
            'useState',
            'Responsive UI'
          ]}
        />

        <div className="section-header">
          <span className="section-eyebrow">Redux Global State Management</span>
          <h1>Guest Wishlist & Experience Itinerary</h1>
          <p className="section-subtitle">
            Demonstrating Redux Toolkit slices (<code>favoritesSlice</code> and <code>cartSlice</code>) for synchronized cross-component state and dynamic currency conversions.
          </p>
        </div>

        {/* Section 1: Saved Suites & Villas */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Heart size={20} color="#f43f5e" fill="#f43f5e" />
              <h3 style={{ fontSize: '1.4rem', margin: 0 }}>
                Saved Accommodations ({savedRooms.length})
              </h3>
            </div>

            {savedRooms.length > 0 && (
              <button
                onClick={() => {
                  dispatch(clearFavorites());
                  showToast('Wishlist cleared.', 'info');
                }}
                className="btn btn-secondary btn-sm"
              >
                <Trash2 size={14} /> Clear Wishlist
              </button>
            )}
          </div>

          {savedRooms.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {savedRooms.map((room) => {
                const formattedPrice = formatPrice(room.price, currency, currencyRates, currencySymbols);
                return (
                  <div key={room.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '200px', position: 'relative' }}>
                      <img src={room.image} alt={room.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span className="badge badge-gold" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                        {room.categoryLabel}
                      </span>
                    </div>

                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>{room.title}</h4>
                      <p style={{ fontSize: '0.88rem', marginBottom: '1rem', flex: 1 }}>{room.description}</p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From</span>
                          <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-gold)', fontFamily: 'var(--font-serif)' }}>
                            {formattedPrice} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/ night</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => {
                              dispatch(removeFavorite(room.id));
                              showToast(`Removed "${room.title}" from saved favorites`, 'info');
                            }}
                            className="btn btn-secondary btn-sm"
                            title="Remove from favorites (Redux dispatch)"
                          >
                            <Trash2 size={14} />
                          </button>
                          <Link to={`/rooms/${room.id}`} className="btn btn-primary btn-sm">
                            View Suite <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <Heart size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.8rem auto' }} />
              <h4>Your wishlist is empty</h4>
              <p style={{ margin: '0.4rem 0 1.2rem 0', fontSize: '0.92rem' }}>
                Click the heart icon on any suite card to save accommodations to this Redux store list.
              </p>
              <Link to="/rooms" className="btn btn-outline-gold btn-sm">
                Browse Suites & Villas
              </Link>
            </div>
          )}
        </div>

        {/* Section 2: Booked Experiences Itinerary (cartSlice) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShoppingBag size={20} color="var(--color-gold-500)" />
              <h3 style={{ fontSize: '1.4rem', margin: 0 }}>
                Curated Experiences Itinerary ({cartItems.length})
              </h3>
            </div>

            {cartItems.length > 0 && (
              <button
                onClick={() => dispatch(clearCart())}
                className="btn btn-secondary btn-sm"
              >
                Clear Itinerary
              </button>
            )}
          </div>

          {cartItems.length > 0 ? (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.8rem' }}>
                {cartItems.map((item) => {
                  const itemFormatted = formatPrice(item.price * (item.guests || 1), currency, currencyRates, currencySymbols);
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        background: 'var(--bg-muted)',
                        borderRadius: 'var(--radius-md)',
                        flexWrap: 'wrap',
                        gap: '0.8rem',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-gold)', fontWeight: 600 }}>{item.category}</span>
                        <h4 style={{ fontSize: '1.05rem', margin: '0.2rem 0' }}>{item.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {item.guests || 1} Guest(s) • Scheduled Date: {item.date}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                        <strong style={{ fontSize: '1.2rem', color: 'var(--text-gold)', fontFamily: 'var(--font-serif)' }}>
                          {itemFormatted}
                        </strong>
                        <button
                          onClick={() => {
                            dispatch(removeItem(item.id));
                            showToast(`Removed "${item.title}" from itinerary`, 'info');
                          }}
                          className="btn btn-danger btn-sm"
                          style={{ padding: '0.4rem' }}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Itinerary Investment</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-gold)', fontFamily: 'var(--font-serif)' }}>
                    {formattedCartTotal}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <Link to="/services" className="btn btn-secondary">
                    Add More Experiences
                  </Link>
                  <button onClick={handleCheckoutItinerary} className="btn btn-primary">
                    <Check size={16} /> Confirm Itinerary with Concierge
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <ShoppingBag size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.8rem auto' }} />
              <h4>No experiences reserved yet</h4>
              <p style={{ margin: '0.4rem 0 1.2rem 0', fontSize: '0.92rem' }}>
                Visit our Spa, Michelin Dining, or Ocean Adventures nested pages to reserve experiences directly to this itinerary.
              </p>
              <Link to="/services" className="btn btn-outline-gold btn-sm">
                Explore Resort Experiences
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
