import { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';
import { Save } from 'lucide-react';

export const EditBookingModal = ({ isOpen, onClose, booking, onBookingUpdated }) => {
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  useEffect(() => {
    if (booking) {
      setFormData({
        ...booking,
      });
      setErrors({});
    }
  }, [booking]);

  if (!formData) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Guest name is required';
    }
    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      newErrors.checkOut = 'Check-out date must be after check-in';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Recompute nights and total if dates changed
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const nights = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    const updatedTotal = nights * (formData.pricePerNight || 850);

    const updatedBooking = {
      ...formData,
      nights,
      totalAmount: updatedTotal,
    };

    onBookingUpdated(updatedBooking);
    showToast(`Reservation ${formData.id} updated successfully!`, 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Update Reservation (${formData.id})`}
      maxWidth="600px"
    >
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label className="form-label">Guest Full Name</label>
          <input
            type="text"
            value={formData.guestName}
            onChange={(e) => handleChange('guestName', e.target.value)}
            className={`form-input ${errors.guestName ? 'error' : ''}`}
          />
          {errors.guestName && <span className="form-error">{errors.guestName}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Check-in Date</label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) => handleChange('checkIn', e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Check-out Date</label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) => handleChange('checkOut', e.target.value)}
              className={`form-input ${errors.checkOut ? 'error' : ''}`}
            />
            {errors.checkOut && <span className="form-error">{errors.checkOut}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Number of Guests</label>
            <select
              value={formData.guests}
              onChange={(e) => handleChange('guests', Number(e.target.value))}
              className="form-select"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} Guests
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Reservation Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="form-select"
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Checked-In">Checked-In</option>
              <option value="Pending">Pending Deposit</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Special Requests / Concierge Notes</label>
          <textarea
            rows="3"
            value={formData.specialRequests || ''}
            onChange={(e) => handleChange('specialRequests', e.target.value)}
            className="form-textarea"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBookingModal;
