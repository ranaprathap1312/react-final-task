import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, MapPin, Phone, Mail, Award } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address to subscribe.', 'error');
      return;
    }
    showToast('Thank you for subscribing to Aurelia Private Gazette!', 'success');
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="brand-emblem">⚜</div>
              <span>AURELIA GRAND</span>
            </div>
            <p style={{ maxWidth: '340px', marginBottom: '1.4rem', fontSize: '0.92rem' }}>
              An ultra-luxury sanctuary established in 1928, set amidst pristine coral archipelagos. Rated #1 Luxury Resort Worldwide by Condé Nast Traveler.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-gold)' }}>
              <Award size={18} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Forbes Travel Guide 5-Star Winner</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Sanctuary</Link></li>
              <li><Link to="/rooms">Suites & Villas</Link></li>
              <li><Link to="/services">Resort Experiences</Link></li>
              <li><Link to="/bookings">Manage Bookings</Link></li>
              <li><Link to="/explore">Island Excursions</Link></li>
              <li><Link to="/favorites">Saved Wishlist</Link></li>
            </ul>
          </div>

          {/* Experience Sub-routes */}
          <div>
            <h4 className="footer-title">Curated Offerings</h4>
            <ul className="footer-links">
              <li><Link to="/services/spa">Lotus Wellness Spa</Link></li>
              <li><Link to="/services/dining">Michelin Gastronomy</Link></li>
              <li><Link to="/services/adventures">Ocean Expeditions</Link></li>
              <li><Link to="/services/events">Weddings & Galas</Link></li>
              <li><Link to="/about">Our Heritage</Link></li>
              <li><Link to="/contact">VIP Concierge</Link></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="footer-title">The Aurelia Gazette</h4>
            <p style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
              Receive bespoke seasonal invitations, secret villa releases, and culinary previews.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.4rem' }}>
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}
                aria-label="Email subscription input"
              />
              <button type="submit" className="btn btn-primary btn-sm" aria-label="Subscribe to newsletter">
                <Send size={15} />
              </button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} color="var(--color-gold-500)" /> Aurelia Atoll Lagoon, Malé South
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={15} color="var(--color-gold-500)" /> +1 (800) 789-AURELIA
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} color="var(--color-gold-500)" /> concierge@aureliagrand.com
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Aurelia Grand Resort & Spa. Built with React 19, Redux Toolkit & React Router DOM.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Netlify Deployment Ready</span>
            <Link to="/bookings" style={{ color: 'var(--text-gold)' }}>Manage Reservations (CRUD)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
