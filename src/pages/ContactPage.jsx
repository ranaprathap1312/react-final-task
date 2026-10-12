import { useState, useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';
import ConceptBadge from '../components/common/ConceptBadge';
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';

export const ContactPage = () => {
  useDocumentTitle('VIP Concierge & Reservation Inquiries');
  const { showToast } = useToast();

  // Controlled form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Suite Reservation',
    arrivalDate: '',
    guestCount: '2',
    message: '',
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // useRef hooks for auto-focusing on invalid inputs
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'What is the complimentary seaplane transfer schedule?',
      a: 'Aurelia Grand operates private luxury twin-engine seaplane transfers directly from Malé International Airport (MLE). Flights run seamlessly between 06:00 and 16:30 daily in alignment with international flight arrivals.',
    },
    {
      q: 'Are children permitted in overwater villas?',
      a: 'Yes, children of all ages are welcome. For families with children under 12 staying in overwater villas, safety nets and monitored balcony glass gates are provided upon request with personal butler assistance.',
    },
    {
      q: 'How do dietary preferences and allergies work for Michelin dining?',
      a: 'Our Executive Culinary team accommodates all dietary restrictions, including strict vegan, kosher-friendly, halal-certified, gluten-free, and custom allergen protocols with 48 hours prior notification.',
    },
    {
      q: 'What is the cancellation and rescheduling policy?',
      a: 'We offer flexible complimentary rescheduling up to 48 hours before check-in for individual suite reservations. For bespoke private island charters, our concierge will advise on dedicated terms.',
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]{8,20}$/;

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (at least 3 characters)';
      if (fullNameRef.current) fullNameRef.current.focus();
    } else if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
      if (emailRef.current) emailRef.current.focus();
    } else if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      errs.phone = 'Please provide a valid contact number (min 8 digits)';
      if (phoneRef.current) phoneRef.current.focus();
    } else if (!formData.message.trim() || formData.message.trim().length < 20) {
      errs.message = 'Please provide an inquiry description (minimum 20 characters)';
      if (messageRef.current) messageRef.current.focus();
    } else if (!formData.acceptedTerms) {
      errs.acceptedTerms = 'You must acknowledge the resort inquiry privacy policy';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    setIsSubmitted(true);
    showToast(`Inquiry sent! A private concierge will contact ${formData.email} within 2 hours.`, 'success');
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      inquiryType: 'Suite Reservation',
      arrivalDate: '',
      guestCount: '2',
      message: '',
      acceptedTerms: false,
    });
    setErrors({});
    setIsSubmitted(false);
    if (fullNameRef.current) fullNameRef.current.focus();
    showToast('Form fields cleared.', 'info');
  };

  return (
    <div className="section-padding">
      <div className="container">
        {/* Concept Inspector Banner */}
        <ConceptBadge
          activeConcepts={[
            'Form Validation',
            'useRef',
            'useState',
            'Conditional Rendering',
            'List Rendering',
            'Toast Notifications',
            'Responsive UI'
          ]}
        />

        <div className="section-header">
          <span className="section-eyebrow">Personalized Hospitality</span>
          <h1>VIP Concierge & Inquiries</h1>
          <p className="section-subtitle">
            Controlled form state with comprehensive validation, error focus via <code>useRef</code>, and instant concierge routing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '3rem', alignItems: 'start' }}>
          {/* Contact Information Card */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>The Concierge Desk</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={22} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Private Atoll Location</strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Aurelia Grand Lagoon, South Malé Biosphere, Indian Ocean
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Phone size={22} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Direct Butler Line</strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    +1 (800) 789-AURELIA / +960 664 0000
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Mail size={22} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Private Gazette & Desk</strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    concierge@aureliagrand.com
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Clock size={22} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Concierge Desk Availability</strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    24 Hours / 7 Days a week (Multilingual support)
                  </span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-muted)', padding: '1.2rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-gold-500)' }}>
              <p style={{ fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>
                "Every request is an opportunity to craft perfection. We respond to all formal inquiries in under 2 hours."
              </p>
            </div>
          </div>

          {/* Form Validation Card */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ color: 'var(--color-emerald)', marginBottom: '1.2rem', display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle2 size={54} />
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>Inquiry Received with Distinction</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 2rem auto' }}>
                  Thank you, <strong>{formData.fullName}</strong>. Our Head Concierge has been assigned to your request regarding <em>{formData.inquiryType}</em>.
                </p>
                <button onClick={handleReset} className="btn btn-secondary">
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Submit Formal Inquiry</h3>

                {/* Full Name Field with useRef */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Full Legal Name *</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>min 3 chars</span>
                  </label>
                  <input
                    ref={fullNameRef}
                    type="text"
                    placeholder="e.g. Countess Diana Spencer"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                  {/* Email Field with regex validation and useRef */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Email Address *</span>
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder="guest@domain.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  {/* Phone Field with useRef */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Phone / Mobile *</span>
                    </label>
                    <input
                      ref={phoneRef}
                      type="tel"
                      placeholder="+1 555 0192"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Inquiry Nature</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                      className="form-select"
                    >
                      <option value="Suite Reservation">Suite Reservation</option>
                      <option value="Private Island Charter">Private Island Charter</option>
                      <option value="Wedding Gala">Wedding / Celebration</option>
                      <option value="Dining Experience">Michelin Dining Booking</option>
                      <option value="Spa Appointment">Lotus Spa Ritual</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Target Date</label>
                    <input
                      type="date"
                      value={formData.arrivalDate}
                      onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Party Size</label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) => handleInputChange('guestCount', e.target.value)}
                      className="form-select"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6+ Guests</option>
                    </select>
                  </div>
                </div>

                {/* Message Field with character counter & useRef */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Inquiry Details & Preferences *</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {formData.message.length} / 20 chars min
                    </span>
                  </label>
                  <textarea
                    ref={messageRef}
                    rows="4"
                    placeholder="Describe your desired dates, bespoke arrangements, luxury transfers, or culinary desires in detail..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                {/* Terms Checkbox */}
                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.acceptedTerms}
                      onChange={(e) => handleInputChange('acceptedTerms', e.target.checked)}
                      style={{ accentColor: 'var(--color-gold-500)' }}
                    />
                    <span>I agree to receive confidential VIP concierge correspondence regarding this stay.</span>
                  </label>
                  {errors.acceptedTerms && <span className="form-error" style={{ display: 'block' }}>{errors.acceptedTerms}</span>}
                </div>

                {/* Submit and Reset Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">
                    <RotateCcw size={14} /> Clear Form
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg">
                    <Send size={16} /> Transmit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div style={{ marginTop: '5rem' }}>
          <div className="section-header">
            <span className="section-eyebrow">Frequently Addressed</span>
            <h2>Guest Inquiries & Protocols</h2>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card"
                  style={{ overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <div style={{ padding: '1.2rem 1.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 600 }}>{faq.q}</h4>
                    <span style={{ color: 'var(--text-gold)' }}>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 1.6rem 1.4rem 1.6rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                      <p style={{ fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
