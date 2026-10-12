import { Calendar, Users, Edit3, Trash2, CheckCircle2, Clock, Ban } from 'lucide-react';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../utils/formatCurrency';

export const BookingCard = ({ booking, onEdit, onDelete }) => {
  const { currency, currencyRates, currencySymbols } = useSelector((state) => state.ui);

  const formattedTotal = formatPrice(
    booking.totalAmount,
    currency,
    currencyRates,
    currencySymbols
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="badge badge-emerald">
            <CheckCircle2 size={12} /> Confirmed
          </span>
        );
      case 'Checked-In':
        return (
          <span className="badge badge-sky">
            <CheckCircle2 size={12} /> Checked-In
          </span>
        );
      case 'Pending':
        return (
          <span className="badge badge-amber">
            <Clock size={12} /> Pending Deposit
          </span>
        );
      case 'Cancelled':
        return (
          <span className="badge badge-rose">
            <Ban size={12} /> Cancelled
          </span>
        );
      default:
        return <span className="badge badge-gold">{status}</span>;
    }
  };

  return (
    <article className="glass-card" style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-gold)', letterSpacing: '0.06em' }}>
              {booking.id}
            </span>
            {getStatusBadge(booking.status)}
          </div>
          <h3 style={{ fontSize: '1.3rem', margin: 0 }}>{booking.roomTitle}</h3>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Stay</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-gold)', fontFamily: 'var(--font-serif)' }}>
            {formattedTotal}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', background: 'var(--bg-muted)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.88rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Guest Name</span>
          <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>{booking.guestName}</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{booking.email}</span>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stay Dates</span>
          <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={13} color="var(--color-gold-500)" />
            {booking.checkIn} → {booking.checkOut}
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{booking.nights} Nights</span>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Guests & Extras</span>
          <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Users size={13} color="var(--color-gold-500)" /> {booking.guests} Guests
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {booking.addons?.length ? `${booking.addons.length} Add-on(s)` : 'Standard Stay'}
          </span>
        </div>
      </div>

      {booking.specialRequests && (
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', background: 'var(--bg-surface)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-gold-500)' }}>
          <strong>Special Request:</strong> {booking.specialRequests}
        </div>
      )}

      {/* CRUD Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.7rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: 'auto' }}>
        <button
          onClick={() => onEdit(booking)}
          className="btn btn-secondary btn-sm"
          title="Edit Reservation"
        >
          <Edit3 size={14} /> Edit Booking
        </button>
        <button
          onClick={() => onDelete(booking.id)}
          className="btn btn-danger btn-sm"
          title="Cancel Reservation"
        >
          <Trash2 size={14} /> Cancel Stay
        </button>
      </div>
    </article>
  );
};

export default BookingCard;
