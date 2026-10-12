import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Compass, Home, Calendar } from 'lucide-react';

export const NotFoundPage = () => {
  useDocumentTitle('404 Page Not Found');

  return (
    <div className="section-padding container" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--color-gold-500)', marginBottom: '1.5rem' }}>
        <Compass size={64} />
      </div>
      <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>404 Error</span>
      <h1 style={{ marginBottom: '1rem' }}>Uncharted Waters</h1>
      <p style={{ maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '1.05rem' }}>
        The destination or sanctuary you are seeking appears to be beyond our nautical charts or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} /> Return to Sanctuary Home
        </Link>
        <Link to="/rooms" className="btn btn-secondary">
          <Calendar size={16} /> Explore Suites Collection
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
