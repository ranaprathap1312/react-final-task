import { NavLink } from 'react-router-dom';
import { Sparkles, Utensils, Compass, GlassWater } from 'lucide-react';

export const ServiceTabNav = () => {
  const tabs = [
    { to: '/services/spa', label: 'Lotus Ayurvedic Spa', icon: Sparkles },
    { to: '/services/dining', label: 'Michelin Dining & Lounge', icon: Utensils },
    { to: '/services/adventures', label: 'Ocean & Aerial Expeditions', icon: Compass },
    { to: '/services/events', label: 'Weddings & Private Galas', icon: GlassWater },
  ];

  return (
    <nav className="service-tabs-nav" aria-label="Nested Services Navigation">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => `service-tab-btn ${isActive ? 'active' : ''}`}
          >
            <IconComponent size={18} />
            <span>{tab.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default ServiceTabNav;
