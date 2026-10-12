import { useRef, useState, useEffect } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ConceptBadge from '../components/common/ConceptBadge';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Award, Shield, HeartHandshake, Compass } from 'lucide-react';

export const AboutPage = () => {
  useDocumentTitle('Resort Heritage, Architecture & Leadership');

  // useRef implementation: controlling audio/tour player reference directly
  const audioRef = useRef(null);
  const timelineRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const togglePlayAmbient = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play restricted or simulated:', err);
        setIsPlaying(true);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setAudioProgress(0);
    audioRef.current.play();
    setIsPlaying(true);
  };

  // Scroll to timeline milestone using useRef
  const scrollToMilestone = (year) => {
    const el = document.getElementById(`milestone-${year}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const leadership = [
    {
      name: 'Julian de Saint-Germain',
      role: 'Managing Director & Sommelier Grand Master',
      bio: 'Over 28 years managing luxury 5-star properties across Monaco, Saint-Barth, and the Swiss Alps.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Chef Akira Matsuzaki',
      role: 'Executive Chef (3 Michelin Stars)',
      bio: 'Pioneered progressive Kaiseki ocean cuisine, championing zero-kilometer sustainable fishing.',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dr. Indira Pradhan',
      role: 'Director of Holistic Wellness & Ayurveda',
      bio: 'BAMS Ayurvedic Scholar who crafted our bespoke twenty-four-herbal therapeutic elixir formulas.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="section-padding">
      <div className="container">
        {/* Concept Inspector Banner */}
        <ConceptBadge
          activeConcepts={[
            'useRef',
            'useState',
            'useEffect',
            'Components & Props',
            'List Rendering',
            'Responsive UI'
          ]}
        />

        <div className="section-header">
          <span className="section-eyebrow">A Century of Grace</span>
          <h1>The Heritage of Aurelia Grand</h1>
          <p className="section-subtitle">
            Founded in 1928 as an exclusive royal ocean retreat, Aurelia Grand has redefined the art of luxury hospitality for discerning travelers worldwide.
          </p>
        </div>

        {/* useRef Ambient Atmosphere Soundscape Player */}
        <div
          className="glass-card"
          style={{
            padding: '1.6rem 2rem',
            marginBottom: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.2rem',
            border: '1px solid var(--border-strong)',
          }}
        >
          {/* HTML5 Audio element attached to useRef */}
          <audio
            ref={audioRef}
            src="https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg"
            onTimeUpdate={() => {
              if (audioRef.current) {
                const p = (audioRef.current.currentTime / (audioRef.current.duration || 60)) * 100;
                setAudioProgress(p);
              }
            }}
            onEnded={() => setIsPlaying(false)}
            loop
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: isPlaying ? 'var(--color-gold-500)' : 'var(--bg-muted)',
                color: isPlaying ? '#0c0f14' : 'var(--text-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isPlaying ? 'var(--shadow-gold)' : 'none',
                transition: 'all 0.3s',
              }}
            >
              <Volume2 size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.98rem' }}>
                Resort Ambient Soundscape (useRef Hook Demonstration)
              </strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Direct DOM audio manipulation: {isPlaying ? 'Playing Live Ocean Waves' : 'Paused'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button onClick={togglePlayAmbient} className="btn btn-primary btn-sm">
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              {isPlaying ? 'Pause Waves' : 'Play Ocean Ambient'}
            </button>
            <button onClick={toggleMute} className="btn btn-secondary btn-sm" title="Toggle Mute">
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button onClick={handleRestart} className="btn btn-secondary btn-sm" title="Restart Audio">
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Narrative Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <span className="section-eyebrow">Architecture & Philosophy</span>
            <h2 style={{ marginBottom: '1.2rem', fontSize: '2.2rem' }}>Harmony With the Coral Atoll</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.2rem' }}>
              Designed by visionary landscape architects, every suite and overwater pavilion at Aurelia Grand floats with reverence upon the crystalline lagoon. We generate 100% of our energy through solar microgrids and desalinate our fresh water using zero-carbon osmotic filtration.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Our private coral restoration laboratory has rehabilitated over 45,000 square meters of thriving barrier reefs, providing a secure sanctuary for hawksbill sea turtles and manta rays.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Shield size={20} color="var(--color-gold-500)" />
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>Zero Single-Use Plastics</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Award size={20} color="var(--color-gold-500)" />
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>UNESCO Biosphere Partner</span>
              </div>
            </div>
          </div>

          <div style={{ height: '420px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"
              alt="Aurelia Grand Architecture"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Historical Timeline */}
        <div ref={timelineRef} style={{ marginBottom: '5rem' }}>
          <div className="section-header">
            <span className="section-eyebrow">Milestones</span>
            <h2>A Century of Distinction</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { year: '1928', title: 'The Royal Founding', desc: 'Established as a private maritime villa for European nobility visiting the Indian Ocean.' },
              { year: '1965', title: 'The Overwater Innovation', desc: 'Built the world’s first stilted overwater bungalows with glass viewing floors.' },
              { year: '2012', title: 'Michelin Star Accolade', desc: 'Subsea restaurant awarded prestigious 3-star distinction for revolutionary cuisine.' },
              { year: '2026', title: 'Net-Zero Biosphere', desc: 'Achieved complete 100% solar microgrid autonomy and global eco-resort certification.' },
            ].map((m) => (
              <div key={m.year} id={`milestone-${m.year}`} className="glass-card" style={{ padding: '1.8rem' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-gold)', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: '0.5rem' }}>
                  {m.year}
                </span>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{m.title}</h4>
                <p style={{ fontSize: '0.88rem' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Leadership Team */}
        <div>
          <div className="section-header">
            <span className="section-eyebrow">World-Class Curators</span>
            <h2>Our Executive Leadership</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {leadership.map((person) => (
              <div key={person.name} className="glass-card" style={{ overflow: 'hidden' }}>
                <div style={{ height: '260px' }}>
                  <img src={person.image} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.6rem' }}>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>{person.name}</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-gold)', fontWeight: 600, display: 'block', marginBottom: '0.8rem' }}>
                    {person.role}
                  </span>
                  <p style={{ fontSize: '0.88rem' }}>{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
