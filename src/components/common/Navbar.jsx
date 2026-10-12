import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Menu, X, CalendarCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import CurrencySelector from './CurrencySelector';
import { toggleMobileMenu, closeMobileMenu } from '../../store/uiSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  const isMobileOpen = useSelector((state) => state.ui.isMobileMenuOpen);
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/rooms', label: 'Suites & Villas' },
    { to: '/services', label: 'Experiences', badge: 'Nested' },
    { to: '/bookings', label: 'Reservations', badge: 'CRUD' },
    { to: '/explore', label: 'Explore', badge: 'API' },
    { to: '/about', label: 'Heritage' },
    { to: '/contact', label: 'Concierge' },
  ];

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => dispatch(closeMobileMenu())}>
          <div className="brand-emblem">⚜</div>
          <span>AURELIA GRAND</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            {navLinks.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      style={{
                        marginLeft: '5px',
                        fontSize: '0.65rem',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        background: 'var(--color-gold-glow)',
                        color: 'var(--text-gold)',
                        border: '1px solid var(--border-subtle)',
                        verticalAlign: 'middle',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons: Currency, Theme, Wishlist, Book Now */}
        <div className="nav-actions">
          <CurrencySelector />
          <ThemeToggle />

          {/* Redux Favorites Wishlist Link */}
          <Link
            to="/favorites"
            className="nav-icon-btn"
            title="Saved Suites & Experiences"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            {favoriteIds.length > 0 && (
              <span className="nav-badge">{favoriteIds.length}</span>
            )}
          </Link>

          {/* Quick Booking CTA */}
          <Link to="/bookings" className="btn btn-primary btn-sm" style={{ display: 'none', minWidth: '130px' }}>
            <CalendarCheck size={16} /> Book Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="mobile-drawer">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => dispatch(closeMobileMenu())}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ fontSize: '1.1rem', padding: '0.5rem 0' }}
            >
              {item.label}
              {item.badge && (
                <span
                  style={{
                    marginLeft: '8px',
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'var(--color-gold-glow)',
                    color: 'var(--text-gold)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '1rem' }}>
            <Link
              to="/bookings"
              onClick={() => dispatch(closeMobileMenu())}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <CalendarCheck size={18} /> Manage Bookings
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
