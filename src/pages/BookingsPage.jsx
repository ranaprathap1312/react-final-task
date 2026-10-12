import { useState, useMemo } from 'react';
import { initialBookings } from '../data/initialBookings';
import BookingCard from '../components/bookings/BookingCard';
import BookingFormModal from '../components/bookings/BookingFormModal';
import EditBookingModal from '../components/bookings/EditBookingModal';
import ConceptBadge from '../components/common/ConceptBadge';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';
import { useSelector } from 'react-redux';
import { formatPrice } from '../utils/formatCurrency';
import {
  CalendarPlus,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  DollarSign,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const BookingsPage = () => {
  useDocumentTitle('Manage Guest Reservations');
  const { showToast } = useToast();
  const { currency, currencyRates, currencySymbols } = useSelector((state) => state.ui);

  // Persistent bookings state via custom hook useLocalStorage
  const [bookings, setBookings] = useLocalStorage('aurelia_guest_bookings', initialBookings);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal states for CRUD operations
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBookingForEdit, setSelectedBookingForEdit] = useState(null);

  // Delete confirmation modal state
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  // Filtered bookings list
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== 'All' && b.status !== statusFilter) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = b.guestName.toLowerCase().includes(q);
        const matchesId = b.id.toLowerCase().includes(q);
        const matchesRoom = b.roomTitle.toLowerCase().includes(q);
        const matchesEmail = b.email.toLowerCase().includes(q);
        return matchesName || matchesId || matchesRoom || matchesEmail;
      }
      return true;
    });
  }, [bookings, statusFilter, searchQuery]);

  // Aggregate stats
  const totalRevenue = bookings.reduce((sum, b) => (b.status !== 'Cancelled' ? sum + b.totalAmount : sum), 0);
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Checked-In').length;
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;

  // CRUD Operation 1: CREATE
  const handleBookingCreated = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // CRUD Operation 2: UPDATE
  const handleOpenEdit = (booking) => {
    setSelectedBookingForEdit(booking);
    setIsEditOpen(true);
  };

  const handleBookingUpdated = (updatedBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
    );
  };

  // CRUD Operation 3: DELETE
  const handleRequestDelete = (bookingId) => {
    setDeleteConfirmationId(bookingId);
  };

  const handleConfirmDelete = () => {
    const deletedId = deleteConfirmationId;
    const removedItem = bookings.find((b) => b.id === deletedId);
    setBookings((prev) => prev.filter((b) => b.id !== deletedId));
    setDeleteConfirmationId(null);
    showToast(`Reservation ${deletedId} (${removedItem?.guestName}) has been cancelled and removed.`, 'info');
  };

  const handleResetToDefault = () => {
    setBookings(initialBookings);
    showToast('Reset reservations back to sample data.', 'info');
  };

  return (
    <div className="section-padding">
      <div className="container">
        {/* Concept Inspector Banner */}
        <ConceptBadge
          activeConcepts={[
            'CRUD Operations',
            'useReducer',
            'useRef',
            'useLocalStorage',
            'Form Validation',
            'useState',
            'List Rendering',
            'Conditional Rendering',
            'Redux Toolkit'
          ]}
        />

        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="section-eyebrow">Front-Desk & Guest Services</span>
            <h1 style={{ marginBottom: '0.4rem' }}>Reservations & Bookings Management</h1>
            <p className="section-subtitle" style={{ margin: 0 }}>
              View, customize, or modify your reserved suites and arrival itineraries with seamless confirmation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={handleResetToDefault}
              className="btn btn-secondary btn-sm"
              title="Reset sample reservations"
            >
              Reset Sample Data
            </button>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="btn btn-primary"
            >
              <CalendarPlus size={18} /> New Reservation
            </button>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
          <div className="glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: 600 }}>Active Bookings</span>
              <Calendar size={18} color="var(--color-gold-500)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-gold)', fontFamily: 'var(--font-serif)' }}>
              {bookings.length}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: 600 }}>Confirmed Stays</span>
              <CheckCircle2 size={18} color="var(--color-emerald)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-emerald)', fontFamily: 'var(--font-serif)' }}>
              {confirmedCount}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: 600 }}>Pending Deposit</span>
              <Clock size={18} color="var(--color-amber)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-amber)', fontFamily: 'var(--font-serif)' }}>
              {pendingCount}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: 600 }}>Confirmed Value</span>
              <DollarSign size={18} color="var(--color-gold-500)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-gold)', fontFamily: 'var(--font-serif)' }}>
              {formatPrice(totalRevenue, currency, currencyRates, currencySymbols)}
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div
          className="glass-card"
          style={{
            padding: '1.2rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
            <input
              type="text"
              placeholder="Search by guest name, booking ID, suite..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.4rem' }}
            />
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>

          {/* Status Filter Chips */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['All', 'Confirmed', 'Checked-In', 'Pending', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`btn btn-sm ${statusFilter === status ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.9rem' }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* CRUD List Rendering (READ) */}
        {filteredBookings.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onEdit={handleOpenEdit}
                onDelete={handleRequestDelete}
              />
            ))}
          </div>
        ) : (
          <div
            className="glass-card"
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              maxWidth: '520px',
              margin: '3rem auto',
            }}
          >
            <Clock size={44} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>No Reservations Found</h3>
            <p style={{ fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              No bookings match your current search query or status filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
              }}
              className="btn btn-secondary btn-sm"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* CREATE Modal */}
        <BookingFormModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onBookingCreated={handleBookingCreated}
        />

        {/* UPDATE Modal */}
        <EditBookingModal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedBookingForEdit(null);
          }}
          booking={selectedBookingForEdit}
          onBookingUpdated={handleBookingUpdated}
        />

        {/* DELETE Confirmation Modal */}
        <Modal
          isOpen={!!deleteConfirmationId}
          onClose={() => setDeleteConfirmationId(null)}
          title="Confirm Reservation Cancellation"
          maxWidth="480px"
        >
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ color: 'var(--color-rose)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <AlertTriangle size={48} />
            </div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Cancel Reservation {deleteConfirmationId}?</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              This will remove the reservation from the guest registry and release the suite accommodation.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="btn btn-secondary"
              >
                Keep Reservation
              </button>
              <button
                onClick={handleConfirmDelete}
                className="btn btn-danger"
              >
                <Trash2 size={16} /> Yes, Cancel Booking
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BookingsPage;
