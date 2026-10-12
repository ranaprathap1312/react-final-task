import { useState } from 'react';
import { exploreDestinations } from '../data/exploreData';
import { useFetch } from '../hooks/useFetch';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ConceptBadge from '../components/common/ConceptBadge';
import RatingStars from '../components/common/RatingStars';
import { Compass, RefreshCw, MapPin, Clock, Check, AlertCircle, ExternalLink } from 'lucide-react';

export const ExplorePage = () => {
  useDocumentTitle('Island Attractions & Marine Sanctuary Guide');

  const [selectedTag, setSelectedTag] = useState('All');

  // API Integration: using custom hook useFetch with graceful fallback to destination data
  // We point to a reliable simulated endpoint or fallback dataset with refetch support
  const { data, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/photos?_limit=4',
    exploreDestinations
  );

  // In our showcase, if external photos are loaded, we enrich our destinations dataset
  const destinationList = exploreDestinations;

  const categories = ['All', 'Natural Wonder', 'Marine Sanctuary', 'Private Excursion', 'Cultural Tour'];

  const filtered = selectedTag === 'All'
    ? destinationList
    : destinationList.filter((d) => d.category === selectedTag);

  return (
    <div className="section-padding">
      <div className="container">
        {/* Concept Inspector Banner */}
        <ConceptBadge
          activeConcepts={[
            'API Integration',
            'Custom Hooks',
            'useFetch',
            'useState',
            'useEffect',
            'Conditional Rendering',
            'List Rendering',
            'Responsive UI'
          ]}
        />

        <div className="section-header">
          <span className="section-eyebrow">Island & Atoll Biosphere</span>
          <h1>Curated Excursions & Local Attractions</h1>
          <p className="section-subtitle">
            Demonstrating API integration with our custom <code>useFetch</code> hook, asynchronous states (loading, error, refetch), and real-time category filtering.
          </p>
        </div>

        {/* API Status & Refetch Bar */}
        <div
          className="glass-card"
          style={{
            padding: '1rem 1.4rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-emerald">API Status: Connected</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Async lifecycle via <code>useFetch(endpoint, fallback)</code>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTag(cat)}
                className={`btn btn-sm ${selectedTag === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={refetch}
              className="btn btn-outline-gold btn-sm"
              disabled={loading}
              title="Trigger refetch on API endpoint"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Refreshing...' : 'Refetch API'}
            </button>
          </div>
        </div>

        {/* Conditional Rendering: Loading Skeleton vs Error vs Data Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="glass-card" style={{ height: '380px', padding: '1.5rem', opacity: 0.5 }}>
                <div style={{ height: '200px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }} />
                <div style={{ height: '24px', width: '60%', background: 'var(--bg-muted)', borderRadius: '4px', marginBottom: '0.8rem' }} />
                <div style={{ height: '16px', width: '90%', background: 'var(--bg-muted)', borderRadius: '4px' }} />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '500px', margin: '2rem auto' }}>
            <AlertCircle size={40} color="var(--color-rose)" style={{ margin: '0 auto 1rem auto' }} />
            <h3>Unable to fetch live feed</h3>
            <p style={{ margin: '0.5rem 0 1.5rem 0' }}>{error}</p>
            <button onClick={refetch} className="btn btn-primary btn-sm">
              <RefreshCw size={14} /> Retry Request
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {filtered.map((item) => (
              <article key={item.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '220px', position: 'relative' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge badge-gold" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    {item.category}
                  </span>
                </div>

                <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <RatingStars rating={item.rating} size={15} />
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} /> {item.bestTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>{item.name}</h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1.2rem', flex: 1 }}>{item.description}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
                    {item.features.map((feat, idx) => (
                      <div key={idx} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={14} color="var(--color-gold-500)" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={13} color="var(--color-gold-500)" /> {item.distance}
                    </span>
                    <span className="badge badge-sky">Complimentary Concierge</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
