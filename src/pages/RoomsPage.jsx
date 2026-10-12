import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { roomsData } from '../data/roomsData';
import RoomCard from '../components/rooms/RoomCard';
import RoomFilterBar from '../components/rooms/RoomFilterBar';
import BookingFormModal from '../components/bookings/BookingFormModal';
import ConceptBadge from '../components/common/ConceptBadge';
import { useDebounce } from '../hooks/useDebounce';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SearchX } from 'lucide-react';

export const RoomsPage = ({ onBookingCreated }) => {
  useDocumentTitle('Suites & Private Villas Collection');

  // React Router DOM: useSearchParams hook
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL query parameters
  const initialCategory = searchParams.get('category') || 'all';
  const initialMaxPrice = Number(searchParams.get('maxPrice')) || 1500;
  const initialSortBy = searchParams.get('sortBy') || 'featured';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [sortBy, setSortBy] = useState(initialSortBy);

  // Custom hook: useDebounce
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Sync state changes back to searchParams URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (maxPrice < 1500) params.set('maxPrice', String(maxPrice));
    if (sortBy !== 'featured') params.set('sortBy', sortBy);

    setSearchParams(params, { replace: true });
  }, [debouncedSearch, selectedCategory, maxPrice, sortBy, setSearchParams]);

  // Filter and sort rooms list
  const filteredRooms = useMemo(() => {
    return roomsData
      .filter((room) => {
        // Category filter
        if (selectedCategory !== 'all' && room.category !== selectedCategory) {
          return false;
        }
        // Max price filter
        if (room.price > maxPrice) {
          return false;
        }
        // Search filter (title, description, amenities)
        if (debouncedSearch) {
          const query = debouncedSearch.toLowerCase();
          const matchesTitle = room.title.toLowerCase().includes(query);
          const matchesDesc = room.description.toLowerCase().includes(query);
          const matchesAmenity = room.amenities.some((a) => a.toLowerCase().includes(query));
          if (!matchesTitle && !matchesDesc && !matchesAmenity) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, maxPrice, debouncedSearch, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMaxPrice(1500);
    setSortBy('featured');
    setSearchParams({});
  };

  const handleQuickBook = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  return (
    <div className="section-padding">
      <div className="container">
        {/* Concepts Demonstration Banner */}
        <ConceptBadge
          activeConcepts={[
            'useSearchParams',
            'Custom Hooks',
            'useDebounce',
            'useState',
            'useEffect',
            'List Rendering',
            'Conditional Rendering',
            'Redux Toolkit'
          ]}
        />

        <div className="section-header">
          <span className="section-eyebrow">Exquisite Sanctuaries</span>
          <h1>Suites, Penthouses & Overwater Villas</h1>
          <p className="section-subtitle">
            Filter our exclusive accommodations by collection, amenities, and nightly price. All stays include daily champagne breakfast and personal butler service.
          </p>
        </div>

        {/* Filter Controls (connected to useSearchParams) */}
        <RoomFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onResetFilters={handleResetFilters}
          totalResults={filteredRooms.length}
        />

        {/* Conditional Rendering: Rooms List vs Empty State */}
        {filteredRooms.length > 0 ? (
          <div className="rooms-grid">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onQuickBook={handleQuickBook}
              />
            ))}
          </div>
        ) : (
          <div
            className="glass-card"
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              maxWidth: '540px',
              margin: '3rem auto',
            }}
          >
            <div style={{ color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <SearchX size={48} />
            </div>
            <h3 style={{ marginBottom: '0.6rem' }}>No Accommodations Matched</h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              We could not find any suites matching your specific filters. Try loosening your price limit or clearing the search keyword.
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
              Reset All Filters
            </button>
          </div>
        )}

        {/* Booking Form Modal */}
        <BookingFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialRoom={selectedRoom}
          onBookingCreated={onBookingCreated}
        />
      </div>
    </div>
  );
};

export default RoomsPage;
