import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatCurrency';
import { Clock, Check, Plus, Calendar } from 'lucide-react';

export const ServiceSubView = ({ serviceData, categoryKey }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { currency, currencyRates, currencySymbols } = useSelector((state) => state.ui);

  const handleBookExperience = (item) => {
    dispatch(
      addItem({
        id: item.id,
        title: item.name,
        category: serviceData.title,
        price: item.price,
        guests: 1,
        date: new Date().toISOString().split('T')[0],
      })
    );
    showToast(`Added "${item.name}" to your resort itinerary!`, 'success');
  };

  return (
    <div className="animate-fade-in">
      {/* Featured Header Card */}
      <div
        className="glass-card"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2.5rem',
          padding: '2.5rem',
          marginBottom: '3.5rem',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div>
          <span className="section-eyebrow">{serviceData.eyebrow}</span>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{serviceData.title}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-gold)', fontStyle: 'italic', marginBottom: '1.2rem' }}>
            "{serviceData.tagline}"
          </p>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.96rem' }}>
            {serviceData.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {serviceData.highlights.map((highlight, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-emerald)', display: 'flex' }}><Check size={16} /></span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '360px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <img
            src={serviceData.heroImage}
            alt={serviceData.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Offerings Grid */}
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <span className="section-eyebrow">Signature Offerings</span>
        <h3 style={{ fontSize: '1.8rem' }}>Curated Experiences & Reservations</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {serviceData.items.map((item) => {
          const formatted = formatPrice(item.price, currency, currencyRates, currencySymbols);
          return (
            <div key={item.id} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                <span className="badge badge-gold">{item.suitableFor}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <Clock size={13} /> {item.duration}
                </span>
              </div>

              <h4 style={{ fontSize: '1.3rem', marginBottom: '0.6rem' }}>{item.name}</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{item.desc}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', marginTop: 'auto' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Investment</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-gold)', fontFamily: 'var(--font-serif)' }}>
                    {formatted}
                  </div>
                </div>

                <button
                  onClick={() => handleBookExperience(item)}
                  className="btn btn-primary btn-sm"
                  title="Reserve this experience (Redux action)"
                >
                  <Plus size={15} /> Reserve Experience
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSubView;
