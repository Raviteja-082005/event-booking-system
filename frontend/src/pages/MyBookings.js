import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserBookings, cancelBooking } from '../services/api';
import { toast } from 'react-toastify';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserBookings().then((res) => setBookings(res.data)).finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      toast.success('Booking cancelled');
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
    } catch {
      toast.error('Cancellation failed');
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <p style={{ color: 'var(--text-muted)' }}>Loading bookings...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '7rem 2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          My <span style={{ color: '#ff6b35' }}>Bookings</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your event tickets</p>
      </div>

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem',
          background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎫</div>
          <h3 style={{ marginBottom: '0.5rem', fontFamily: 'Playfair Display', fontSize: '1.5rem' }}>No bookings yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Start exploring events!</p>
          <Link to="/events" style={{
            background: 'linear-gradient(135deg, #ff6b35, #e55a25)', color: 'white',
            padding: '0.75rem 2rem', borderRadius: '50px', fontWeight: 700
          }}>Browse Events</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bookings.map((booking) => (
            <div key={booking._id} style={{
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${booking.status === 'confirmed' ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '20px', padding: '1.75rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.3rem', fontWeight: 700 }}>
                    {booking.event?.title}
                  </h3>
                  <span style={{
                    padding: '0.2rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700,
                    background: booking.status === 'confirmed' ? 'rgba(0,212,170,0.15)' : 'rgba(255,100,100,0.15)',
                    color: booking.status === 'confirmed' ? '#00d4aa' : '#ff6464'
                  }}>{booking.status}</span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                  <span>📅 {new Date(booking.event?.date).toLocaleDateString()}</span>
                  <span>📍 {booking.event?.location}</span>
                  <span>💺 {booking.seats} seat{booking.seats > 1 ? 's' : ''}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem', fontWeight: 900,
                  color: '#ff6b35', marginBottom: '0.5rem' }}>${booking.totalAmount}</div>
                {booking.status === 'confirmed' && (
                  <button onClick={() => handleCancel(booking._id)} style={{
                    background: 'rgba(255,100,100,0.1)', color: '#ff6464',
                    border: '1px solid rgba(255,100,100,0.3)', padding: '0.4rem 1rem',
                    borderRadius: '50px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600
                  }}>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
