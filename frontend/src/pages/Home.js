import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const categories = [
    { icon: '🎵', label: 'Concerts', desc: 'Live music experiences', color: '#ff6b35' },
    { icon: '🎤', label: 'Conferences', desc: 'Industry-leading talks', color: '#ffd700' },
    { icon: '🏆', label: 'Sports', desc: 'Live sporting events', color: '#00d4aa' },
    { icon: '🎭', label: 'Theater', desc: 'Arts & performances', color: '#a855f7' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', padding: '2rem'
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)'
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)'
        }} />

        <div style={{
          textAlign: 'center', maxWidth: '800px', zIndex: 1,
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease'
        }}>
          <div style={{
            display: 'inline-block', background: 'rgba(255,107,53,0.1)',
            border: '1px solid rgba(255,107,53,0.3)', borderRadius: '50px',
            padding: '0.4rem 1.2rem', marginBottom: '2rem',
            color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em'
          }}>
            🔥 DISCOVER AMAZING EVENTS
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display', fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem'
          }}>
            Your Next{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ff6b35, #ffd700)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              Unforgettable
            </span>
            {' '}Experience
          </h1>

          <p style={{
            fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem',
            lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 3rem'
          }}>
            Discover and book tickets for concerts, conferences, sports events and more. 
            Your next great memory starts here.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/events" style={{
              background: 'linear-gradient(135deg, #ff6b35, #e55a25)',
              color: 'white', padding: '1rem 2.5rem', borderRadius: '50px',
              fontWeight: 700, fontSize: '1rem', boxShadow: '0 8px 30px rgba(255,107,53,0.4)',
              transition: 'transform 0.2s', display: 'inline-block'
            }}>
              Browse Events →
            </Link>
            <Link to="/register" style={{
              background: 'rgba(255,255,255,0.05)', color: 'white',
              padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 600,
              fontSize: '1rem', border: '1px solid rgba(255,255,255,0.1)',
              display: 'inline-block'
            }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'Playfair Display', fontSize: '2.5rem', fontWeight: 700,
          textAlign: 'center', marginBottom: '3rem'
        }}>
          Browse by <span style={{ color: '#ff6b35' }}>Category</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat) => (
            <Link to="/events" key={cat.label} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px', padding: '2rem', textAlign: 'center',
              transition: 'all 0.3s ease', display: 'block',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = cat.color;
              e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{cat.label}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        background: 'rgba(255,107,53,0.05)', borderTop: '1px solid rgba(255,107,53,0.1)',
        borderBottom: '1px solid rgba(255,107,53,0.1)', padding: '4rem 2rem'
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center'
        }}>
          {[['500+', 'Events Listed'], ['10K+', 'Happy Attendees'], ['50+', 'Cities Covered']].map(([num, label]) => (
            <div key={label}>
              <div style={{
                fontFamily: 'Playfair Display', fontSize: '3rem', fontWeight: 900,
                background: 'linear-gradient(135deg, #ff6b35, #ffd700)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>{num}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
