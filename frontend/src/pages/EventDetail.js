import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEvent, createBooking } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const categoryColors = { concert: '#ff6b35', conference: '#ffd700', sports: '#00d4aa', other: '#a855f7' };

const EventDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    getEvent(id).then((res) => setEvent(res.data)).finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async () => {
    if (!user) { navigate('/login'); return; }
    setBooking(true);
    try {
      await createBooking({ eventId: id, seats });
      toast.success('🎉 Booking confirmed!');
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <p style={{ color: 'var(--text-muted)' }}>Loading event...</p>
    </div>
  );

  if (!event) return (
    <div style={{ textAlign: 'center', padding: '10rem', color: 'var(--text-muted)' }}>
      <h3>Event not found</h3>
      <Link to="/events" style={{ color: '#ff6b35' }}>Browse Events</Link>
    </div>
  );

  const color = categoryColors[event.category] || '#ff6b35';

  return (
    <div style={{ minHeight: '100vh', padding: '7rem 2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/events" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'inline-flex',
        alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        ← Back to Events
      </Link>

      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px', overflow: 'hidden'
      }}>
        {/* Top color bar */}
        <div style={{ height: '6px', background: `linear-gradient(90deg, ${color}, transparent)` }} />

        <div style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{
              background: `rgba(255,107,53,0.15)`, color,
              padding: '0.4rem 1rem', borderRadius: '50px',
              fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>{event.category}</span>
            <span style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', fontWeight: 900, color }}>
              ${event.price}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontFamily: 'DM Sans' }}>/seat</span>
            </span>
          </div>

          <h1 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', fontWeight: 900,
            marginBottom: '1rem', lineHeight: 1.2 }}>{event.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            {event.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { icon: '📍', label: 'Location', value: event.location },
              { icon: '📅', label: 'Date', value: new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
              { icon: '💺', label: 'Available', value: `${event.availableSeats} seats` },
              { icon: '🎟️', label: 'Total Seats', value: event.totalSeats },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px', padding: '1rem'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icon}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase',
                  letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{label}</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Booking Section */}
          <div style={{
            background: 'rgba(255,107,53,0.05)', border: '1px solid rgba(255,107,53,0.15)',
            borderRadius: '16px', padding: '2rem'
          }}>
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Book Your Tickets
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)',
                  marginBottom: '0.5rem', fontWeight: 600 }}>Number of Seats</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button onClick={() => setSeats(Math.max(1, seats - 1))} style={{
                    width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent', color: 'white', fontSize: '1.2rem', cursor: 'pointer'
                  }}>−</button>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, minWidth: '30px', textAlign: 'center' }}>{seats}</span>
                  <button onClick={() => setSeats(Math.min(event.availableSeats, seats + 1))} style={{
                    width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent', color: 'white', fontSize: '1.2rem', cursor: 'pointer'
                  }}>+</button>
                </div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Total Amount</div>
                <div style={{ fontFamily: 'Playfair Display', fontSize: '2rem', fontWeight: 900, color }}>
                  ${event.price * seats}
                </div>
              </div>
            </div>
            <button onClick={handleBooking} disabled={booking} style={{
              width: '100%', padding: '1rem', borderRadius: '12px', border: 'none',
              background: `linear-gradient(135deg, ${color}, ${color}cc)`,
              color: 'white', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
              boxShadow: `0 8px 25px ${color}40`, opacity: booking ? 0.7 : 1,
              transition: 'all 0.2s'
            }}>
              {booking ? 'Processing...' : `🎫 Confirm Booking — $${event.price * seats}`}
            </button>
            {!user && (
              <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Link to="/login" style={{ color: '#ff6b35', fontWeight: 600 }}>Sign in</Link> to book tickets
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
