import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? 'rgba(15,15,26,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.8rem' }}>🎫</span>
        <span style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', fontWeight: 900,
          background: 'linear-gradient(135deg, #ff6b35, #ffd700)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          EventBook
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/events" style={{
          color: location.pathname === '/events' ? '#ff6b35' : 'rgba(255,255,255,0.8)',
          fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s'
        }}>Events</Link>

        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" style={{
                color: location.pathname === '/admin' ? '#ff6b35' : 'rgba(255,255,255,0.8)',
                fontWeight: 500, fontSize: '0.95rem'
              }}>Admin</Link>
            )}
            <Link to="/my-bookings" style={{
              color: location.pathname === '/my-bookings' ? '#ff6b35' : 'rgba(255,255,255,0.8)',
              fontWeight: 500, fontSize: '0.95rem'
            }}>My Bookings</Link>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hi, {user.name.split(' ')[0]}</span>
            <button onClick={handleLogout} style={{
              background: 'rgba(255,107,53,0.15)', color: '#ff6b35',
              border: '1px solid rgba(255,107,53,0.3)', padding: '0.5rem 1.25rem',
              borderRadius: '50px', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '0.95rem' }}>Login</Link>
            <Link to="/register" style={{
              background: 'linear-gradient(135deg, #ff6b35, #e55a25)',
              color: 'white', padding: '0.5rem 1.5rem', borderRadius: '50px',
              fontWeight: 600, fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(255,107,53,0.3)'
            }}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
