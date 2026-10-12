import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { roomsData } from '../data/roomsData';
import RoomCard from '../components/rooms/RoomCard';
import BookingFormModal from '../components/bookings/BookingFormModal';
import ConceptBadge from '../components/common/ConceptBadge';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Sparkles, ArrowRight, ShieldCheck, Waves, UtensilsCrossed, Compass, Award, Calendar } from 'lucide-react';

export const HomePage = ({ onBookingCreated }) => {
  useDocumentTitle('Sanctuary of Refinement & Serenity');

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Quick search widget state
  const [searchCheckIn, setSearchCheckIn] = useState('');
  const [searchCheckOut, setSearchCheckOut] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchGuests, setSearchGuests] = useState('2');

  const featuredRooms = roomsData.filter((r) => r.featured);

  const handleQuickBook = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCategory !== 'all') params.set('category', searchCategory);
    if (searchGuests) params.set('guests', searchGuests);
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div>
      {/* Session Concepts Banner */}
      <ConceptBadge
        activeConcepts={[
          'Components & Props',
          'useState',
          'useEffect',
          'Custom Hooks',
          'Redux Toolkit',
          'Conditional Rendering',
          'List Rendering',
          'Responsive UI'
        ]}
      />

      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="badge badge-gold" style={{ marginBottom: '1.2rem', backdropFilter: 'blur(10px)' }}>
            <Sparkles size={14} /> Five-Star Private Atoll Resort
          </span>
          <h1 className="hero-title">Where Timeless Elegance Meets Boundless Horizon</h1>
          <p className="hero-subtitle">
            Immerse yourself in secluded overwater pavilions, Michelin-starred culinary journeys, and restorative holistic spa rituals in our private marine biosphere reserve.
          </p>

          {/* Hero Quick Search Bar */}
          <form onSubmit={handleHeroSearch} className="hero-search-box">
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Collection
              </label>
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="form-select"
                style={{ background: 'transparent', border: 'none', padding: '0.4rem 0', fontWeight: 600 }}
              >
                <option value="all">All Sanctuaries</option>
                <option value="villas">Private Villas</option>
                <option value="penthouses">Ocean Penthouses</option>
                <option value="suites">Sunset Suites</option>
                <option value="deluxe">Beachfront Deluxe</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Check-in
              </label>
              <input
                type="date"
                value={searchCheckIn}
                onChange={(e) => setSearchCheckIn(e.target.value)}
                className="form-input"
                style={{ background: 'transparent', border: 'none', padding: '0.4rem 0' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Check-out
              </label>
              <input
                type="date"
                value={searchCheckOut}
                onChange={(e) => setSearchCheckOut(e.target.value)}
                className="form-input"
                style={{ background: 'transparent', border: 'none', padding: '0.4rem 0' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Guests
              </label>
              <select
                value={searchGuests}
                onChange={(e) => setSearchGuests(e.target.value)}
                className="form-select"
                style={{ background: 'transparent', border: 'none', padding: '0.4rem 0', fontWeight: 600 }}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="4">4 Guests</option>
                <option value="6">6+ Guests</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ height: '48px', padding: '0 1.8rem' }}>
              Explore Suites <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* Stats Counter Banner */}
      <section style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="stats-banner">
            <div>
              <div className="stat-num">98%</div>
              <div className="stat-label">Guest Satisfaction</div>
            </div>
            <div>
              <div className="stat-num">32</div>
              <div className="stat-label">Secluded Atoll Villas</div>
            </div>
            <div>
              <div className="stat-num">3★</div>
              <div className="stat-label">Michelin Culinary Stars</div>
            </div>
            <div>
              <div className="stat-num">1928</div>
              <div className="stat-label">Heritage Established</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Suites Showcase */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Signature Accommodations</span>
            <h2>Curated Suites & Private Water Villas</h2>
            <p className="section-subtitle">
              Each residence is an architectural masterpiece crafted with sustainable teak wood, floor-to-ceiling glass, and dedicated butler service.
            </p>
          </div>

          <div className="rooms-grid">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} onQuickBook={handleQuickBook} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/rooms" className="btn btn-secondary btn-lg">
              View All 6 Collections with Search & Filters <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury Experiences Grid */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">The Aurelia Difference</span>
            <h2>Unrivaled Resort Experiences</h2>
            <p className="section-subtitle">
              From subterranean wine vaults to coral reef helicopter charters, every moment is crafted to exceed your highest aspirations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2.2rem', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-gold-glow)', color: 'var(--color-gold-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem auto' }}>
                <Waves size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Lotus Ayurvedic Spa</h3>
              <p style={{ fontSize: '0.92rem', marginBottom: '1.2rem' }}>
                Glass-bottom overwater treatment pavilions combining centuries-old Himalayan therapies and hydrotherapy.
              </p>
              <Link to="/services/spa" className="btn btn-outline-gold btn-sm">
                Explore Spa Rituals
              </Link>
            </div>

            <div className="glass-card" style={{ padding: '2.2rem', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-gold-glow)', color: 'var(--color-gold-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem auto' }}>
                <UtensilsCrossed size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Michelin Gastronomy</h3>
              <p style={{ fontSize: '0.92rem', marginBottom: '1.2rem' }}>
                Submerged oceanfront dining, private sandbank banquets, and a sommelier vault with over 2,400 Grand Crus.
              </p>
              <Link to="/services/dining" className="btn btn-outline-gold btn-sm">
                View Culinary Menus
              </Link>
            </div>

            <div className="glass-card" style={{ padding: '2.2rem', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-gold-glow)', color: 'var(--color-gold-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem auto' }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Private Ocean Charters</h3>
              <p style={{ fontSize: '0.92rem', marginBottom: '1.2rem' }}>
                72-foot Sunseeker luxury motor yachts, manta ray night dives, and aerial helicopter archipelagic safaris.
              </p>
              <Link to="/services/adventures" className="btn btn-outline-gold btn-sm">
                Discover Expeditions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Testimonial & Heritage Callout */}
      <section className="section-padding">
        <div className="container">
          <div
            className="glass-card"
            style={{
              padding: '3.5rem 2.5rem',
              textAlign: 'center',
              maxWidth: '850px',
              margin: '0 auto',
              background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
            }}
          >
            <div style={{ color: 'var(--color-gold-500)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Award size={36} />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontStyle: 'italic', marginBottom: '1.2rem', lineHeight: 1.4 }}>
              "Aurelia Grand is not merely a hotel; it is an unforgettable realm of pure beauty and immaculate service. The Imperial Penthouse was simply divine."
            </h3>
            <p style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              Sir Richard & Lady Evelyn Kensington
            </p>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Guests of the Presidential Atoll • October 2026
            </span>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      <BookingFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialRoom={selectedRoom}
        onBookingCreated={onBookingCreated}
      />
    </div>
  );
};

export default HomePage;
