import { useRef, useEffect } from 'react';
import { useReservationReducer, ADDONS_LIST } from './useReservationReducer';
import { roomsData } from '../../data/roomsData';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { Check, ArrowRight, ArrowLeft, Tag, ShieldCheck } from 'lucide-react';

export const BookingFormModal = ({ isOpen, onClose, onBookingCreated, initialRoom = null }) => {
  const [state, dispatch] = useReservationReducer(
    initialRoom
      ? {
          roomId: initialRoom.id,
          roomTitle: initialRoom.title,
          pricePerNight: initialRoom.price,
        }
      : {}
  );

  const { showToast } = useToast();

  // useRef hooks for auto-focusing input and form validation focus
  const guestNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  // When step changes to Step 2, auto-focus guest name input using useRef
  useEffect(() => {
    if (state.step === 2 && guestNameRef.current) {
      guestNameRef.current.focus();
    }
  }, [state.step]);

  // Calculate pricing breakdown
  const baseRoomTotal = state.nights * state.pricePerNight;
  const addonsTotal = state.addons.reduce((acc, addonId) => {
    const item = ADDONS_LIST.find((a) => a.id === addonId);
    return acc + (item ? item.price : 0);
  }, 0);
  const subtotal = baseRoomTotal + addonsTotal;
  const discountAmount = Math.round((subtotal * state.discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  // Validate Step 1
  const validateStep1 = () => {
    const errors = {};
    if (!state.checkIn) errors.checkIn = 'Check-in date is required';
    if (!state.checkOut) errors.checkOut = 'Check-out date is required';
    if (new Date(state.checkOut) <= new Date(state.checkIn)) {
      errors.checkOut = 'Check-out must be after check-in date';
    }
    dispatch({ type: 'SET_ERRORS', payload: errors });
    return Object.keys(errors).length === 0;
  };

  // Validate Step 2 with regex
  const validateStep2 = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]{8,20}$/;

    if (!state.guestName.trim() || state.guestName.trim().length < 3) {
      errors.guestName = 'Please enter a valid guest full name (min 3 characters)';
      if (guestNameRef.current) guestNameRef.current.focus();
    } else if (!emailRegex.test(state.email)) {
      errors.email = 'Please provide a valid email address';
      if (emailRef.current) emailRef.current.focus();
    } else if (!phoneRegex.test(state.phone)) {
      errors.phone = 'Please provide a valid phone number with country code';
      if (phoneRef.current) phoneRef.current.focus();
    }

    dispatch({ type: 'SET_ERRORS', payload: errors });
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (state.step === 1) {
      if (validateStep1()) dispatch({ type: 'SET_STEP', payload: 2 });
    } else if (state.step === 2) {
      if (validateStep2()) dispatch({ type: 'SET_STEP', payload: 3 });
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    dispatch({ type: 'APPLY_COUPON', payload: state.couponCode });
  };

  const handleSubmitBooking = () => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: state.guestName.trim(),
      email: state.email.trim(),
      phone: state.phone.trim(),
      roomId: state.roomId,
      roomTitle: state.roomTitle,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      nights: state.nights,
      guests: state.guests,
      pricePerNight: state.pricePerNight,
      totalAmount: finalTotal,
      status: 'Confirmed',
      addons: state.addons.map((id) => ADDONS_LIST.find((a) => a.id === id)?.name).filter(Boolean),
      specialRequests: state.specialRequests,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onBookingCreated(newBooking);
    showToast(`Reservation ${newBooking.id} confirmed successfully!`, 'success');
    dispatch({ type: 'RESET_BOOKING' });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Create Reservation - Step ${state.step} of 3`}
      maxWidth="680px"
    >
      {/* Step Indicator */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.8rem' }}>
        {['Suite & Dates', 'Guest Details & Extras', 'Confirm & Promo'].map((label, index) => {
          const stepNum = index + 1;
          const isActive = state.step === stepNum;
          const isDone = state.step > stepNum;
          return (
            <div
              key={label}
              style={{
                flex: 1,
                borderBottom: `3px solid ${isActive ? 'var(--color-gold-500)' : isDone ? 'var(--color-emerald)' : 'var(--border-subtle)'}`,
                paddingBottom: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: isActive ? 'var(--text-gold)' : isDone ? 'var(--color-emerald)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              {isDone ? <Check size={13} /> : `${stepNum}.`} {label}
            </div>
          );
        })}
      </div>

      {/* STEP 1: Suite Selection & Dates */}
      {state.step === 1 && (
        <div>
          <div className="form-group">
            <label className="form-label">Selected Suite or Villa</label>
            <select
              value={state.roomId}
              onChange={(e) => {
                const room = roomsData.find((r) => r.id === e.target.value);
                if (room) dispatch({ type: 'SET_ROOM', payload: room });
              }}
              className="form-select"
            >
              {roomsData.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.title} — ${room.price}/night ({room.categoryLabel})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Check-in Date</label>
              <input
                type="date"
                value={state.checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_DATES',
                    payload: { checkIn: e.target.value, checkOut: state.checkOut },
                  })
                }
                className={`form-input ${state.errors.checkIn ? 'error' : ''}`}
              />
              {state.errors.checkIn && <span className="form-error">{state.errors.checkIn}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Check-out Date</label>
              <input
                type="date"
                value={state.checkOut}
                min={state.checkIn}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_DATES',
                    payload: { checkIn: state.checkIn, checkOut: e.target.value },
                  })
                }
                className={`form-input ${state.errors.checkOut ? 'error' : ''}`}
              />
              {state.errors.checkOut && <span className="form-error">{state.errors.checkOut}</span>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Guests Count</label>
              <select
                value={state.guests}
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'guests', value: Number(e.target.value) })
                }
                className="form-select"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ background: 'var(--bg-muted)', padding: '0.8rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Duration</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-gold)' }}>
                {state.nights} {state.nights === 1 ? 'Night' : 'Nights'} (${baseRoomTotal})
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button onClick={handleNextStep} className="btn btn-primary">
              Continue to Guest Info <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Guest Details & Addons */}
      {state.step === 2 && (
        <div>
          <div className="form-group">
            <label className="form-label">Full Name of Lead Guest</label>
            <input
              ref={guestNameRef}
              type="text"
              placeholder="e.g. Lady Vivienne Westwood"
              value={state.guestName}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'guestName', value: e.target.value })}
              className={`form-input ${state.errors.guestName ? 'error' : ''}`}
            />
            {state.errors.guestName && <span className="form-error">{state.errors.guestName}</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                ref={emailRef}
                type="email"
                placeholder="guest@luxurytravel.com"
                value={state.email}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                className={`form-input ${state.errors.email ? 'error' : ''}`}
              />
              {state.errors.email && <span className="form-error">{state.errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input
                ref={phoneRef}
                type="tel"
                placeholder="+1 555 123 4567"
                value={state.phone}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'phone', value: e.target.value })}
                className={`form-input ${state.errors.phone ? 'error' : ''}`}
              />
              {state.errors.phone && <span className="form-error">{state.errors.phone}</span>}
            </div>
          </div>

          {/* Luxury Add-ons */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label className="form-label" style={{ marginBottom: '0.6rem' }}>Enhance Your Sanctuary (Optional)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {ADDONS_LIST.map((addon) => {
                const isChecked = state.addons.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.9rem',
                      background: isChecked ? 'var(--color-gold-glow)' : 'var(--bg-muted)',
                      border: `1px solid ${isChecked ? 'var(--color-gold-500)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => dispatch({ type: 'TOGGLE_ADDON', payload: addon.id })}
                        style={{ accentColor: 'var(--color-gold-500)' }}
                      />
                      <span>{addon.name}</span>
                    </div>
                    <strong style={{ color: 'var(--text-gold)' }}>+${addon.price}</strong>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Special Requests or Dietary Requirements</label>
            <textarea
              rows="2"
              placeholder="e.g. Extra pillows, champagne chilling in room, allergies..."
              value={state.specialRequests}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'specialRequests', value: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button
              onClick={() => dispatch({ type: 'SET_STEP', payload: 1 })}
              className="btn btn-secondary"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={handleNextStep} className="btn btn-primary">
              Review & Summary <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Promo & Final Confirmation */}
      {state.step === 3 && (
        <div>
          {/* Booking Summary Box */}
          <div style={{ background: 'var(--bg-muted)', padding: '1.4rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.8rem', color: 'var(--text-gold)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} /> Reservation Overview
            </h4>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.92rem' }}>
              <span>{state.roomTitle} ({state.nights} nights)</span>
              <strong>${baseRoomTotal}</strong>
            </div>

            {addonsTotal > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.92rem' }}>
                <span>Luxury Add-ons ({state.addons.length})</span>
                <strong>+${addonsTotal}</strong>
              </div>
            )}

            {state.discountPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.92rem', color: 'var(--color-emerald)' }}>
                <span>Promo Discount ({state.discountPercent}%)</span>
                <strong>-${discountAmount}</strong>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.8rem', marginTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Total Investment:</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-gold)', fontFamily: 'var(--font-serif)' }}>
                ${finalTotal}
              </span>
            </div>
          </div>

          {/* Promo Coupon Field */}
          <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                placeholder="Promo Code (try AURELIA20 or WELCOME10)"
                value={state.couponCode}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'couponCode', value: e.target.value })}
                className="form-input"
                style={{ paddingLeft: '2.2rem' }}
              />
              <Tag size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <button type="submit" className="btn btn-secondary btn-sm">
              Apply
            </button>
          </form>

          {state.couponMessage && (
            <p style={{ fontSize: '0.85rem', color: state.discountPercent > 0 ? 'var(--color-emerald)' : 'var(--color-rose)', marginBottom: '1rem' }}>
              {state.couponMessage}
            </p>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button
              onClick={() => dispatch({ type: 'SET_STEP', payload: 2 })}
              className="btn btn-secondary"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={handleSubmitBooking} className="btn btn-primary">
              <Check size={16} /> Confirm & Book Stay
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BookingFormModal;
