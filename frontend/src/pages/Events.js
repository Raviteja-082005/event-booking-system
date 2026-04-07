import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api';

const categoryColors = { concert: '#ff6b35', conference: '#ffd700', sports: '#00d4aa', other: '#a855f7' };

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getEvents().then((res) => setEvents(res.data)).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? events : events.filter(e => e.category === filter);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎫</div>
        <p style={{ color: 'var(--text-muted)' }}>Loading events...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '7rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>
          Upcoming <span style={{ color: '#ff6b35' }}>Events</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Find and book your next experience</p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['all', 'concert', 'conference', 'sports', 'other'].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding: '0.5rem 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: '0.85rem', textTransform: 'capitalize', transition: 'all 0.2s',
            background: filter === cat ? 'linear-gradient(135deg, #ff6b35, #e55a25)' : 'rgba(255,255,255,0.05)',
            color: filter === cat ? 'white' : 'var(--text-muted)',
            boxShadow: filter === cat ? '0 4px 15px rgba(255,107,53,0.3)' : 'none'
          }}>{cat}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎭</div>
          <h3 style={{ marginBottom: '0.5rem' }}>No events yet</h3>
          <p>Login as admin to create events!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {filtered.map((event) => (
            <div key={event._id} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px', overflow: 'hidden', transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              e.currentTarget.style.borderColor = categoryColors[event.category] || '#ff6b35';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            }}>
              {/* Card Header */}
              <div style={{
                height: '8px',
                background: `linear-gradient(90deg, ${categoryColors[event.category] || '#ff6b35'}, transparent)`
              }} />
              <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{
                    background: `rgba(${event.category === 'concert' ? '255,107,53' : event.category === 'conference' ? '255,215,0' : event.category === 'sports' ? '0,212,170' : '168,85,247'},0.15)`,
                    color: categoryColors[event.category] || '#ff6b35',
                    padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem',
                    fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}>{event.category}</span>
                  <span style={{
                    fontFamily: 'Playfair Display', fontSize: '1.5rem', fontWeight: 900, color: '#ff6b35'
                  }}>${event.price}</span>
                </div>

                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.3rem', fontWeight: 700,
                  marginBottom: '0.75rem', lineHeight: 1.3 }}>{event.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem',
                  lineHeight: 1.6 }}>{event.description.substring(0, 90)}...</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📍 {event.location}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📅 {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span style={{ color: event.availableSeats < 20 ? '#ff6b35' : 'var(--text-muted)', fontSize: '0.85rem' }}>
                    💺 {event.availableSeats} seats left {event.availableSeats < 20 && '🔥'}
                  </span>
                </div>

                <Link to={`/events/${event._id}`} style={{
                  display: 'block', textAlign: 'center',
                  background: 'linear-gradient(135deg, #ff6b35, #e55a25)',
                  color: 'white', padding: '0.85rem', borderRadius: '12px',
                  fontWeight: 700, fontSize: '0.95rem',
                  boxShadow: '0 4px 15px rgba(255,107,53,0.3)',
                  transition: 'all 0.2s'
                }}>Book Now →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
