import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleConceptBanner } from '../../store/uiSlice';
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const ConceptBadge = ({ activeConcepts = [] }) => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.ui.conceptBannerVisible);
  const [isExpanded, setIsExpanded] = useState(false);

  const allTopics = [
    'Components & Props',
    'useState',
    'useEffect',
    'useRef',
    'useContext',
    'useReducer',
    'Conditional Rendering',
    'List Rendering',
    'API Integration',
    'Custom Hooks',
    'React Router DOM',
    'Nested Routing',
    'useParams',
    'useSearchParams',
    'Redux Toolkit',
    'CRUD Operations',
    'Form Validation',
    'Responsive UI'
  ];

  if (!isVisible) {
    return (
      <div style={{ position: 'fixed', bottom: '1rem', left: '1rem', zIndex: 100 }}>
        <button
          onClick={() => dispatch(toggleConceptBanner())}
          className="btn btn-sm btn-outline-gold"
          style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-md)', fontSize: '0.75rem' }}
        >
          <Sparkles size={14} /> React Concepts Inspector
        </button>
      </div>
    );
  }

  return (
    <aside className="concept-tracker" aria-label="React concepts demonstrated in this project">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'flex', color: 'var(--color-gold-500)' }}>
              <Sparkles size={15} />
            </span>
            <span style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-gold)' }}>
              React Training Session Topics Demonstrated
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
              100% Implemented
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            >
              {isExpanded ? 'Less' : 'Show All (18)'}
              {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            <button
              onClick={() => dispatch(toggleConceptBanner())}
              style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
            >
              Hide
            </button>
          </div>
        </div>

        <div className="concept-pills">
          {(isExpanded ? allTopics : (activeConcepts.length ? activeConcepts : allTopics.slice(0, 8))).map((topic) => {
            const isActive = activeConcepts.includes(topic);
            return (
              <span
                key={topic}
                className={`concept-pill ${isActive ? 'active' : ''}`}
                title={isActive ? `Active concept on this view: ${topic}` : topic}
              >
                <CheckCircle2 size={12} color={isActive ? '#10b981' : 'var(--color-gold-500)'} />
                {topic}
              </span>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default ConceptBadge;
