import { Outlet, useLocation, Navigate } from 'react-router-dom';
import ServiceTabNav from '../components/services/ServiceTabNav';
import ConceptBadge from '../components/common/ConceptBadge';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const ServicesPage = () => {
  useDocumentTitle('Resort Experiences & Offerings');
  const location = useLocation();

  // If at exactly "/services" or "/services/", redirect to the default nested tab "/services/spa"
  if (location.pathname === '/services' || location.pathname === '/services/') {
    return <Navigate to="/services/spa" replace />;
  }

  return (
    <div className="section-padding">
      <div className="container">
        {/* Concept Inspector Banner */}
        <ConceptBadge
          activeConcepts={[
            'Nested Routing',
            'React Router DOM',
            'Components & Props',
            'Redux Toolkit',
            'List Rendering',
            'useDocumentTitle',
            'Responsive UI'
          ]}
        />

        <div className="section-header">
          <span className="section-eyebrow">Nested Routing Showcase</span>
          <h1>Resort Experiences & Curated Offerings</h1>
          <p className="section-subtitle">
            Explore our world-renowned amenities through nested routing views. Each category features instant experience reservations synced to your itinerary.
          </p>
        </div>

        {/* Nested Routing Navigation Tabs */}
        <ServiceTabNav />

        {/* React Router DOM Outlet for rendering nested child routes */}
        <div style={{ marginTop: '2rem' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
