import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, deleteEvent, getAllBookings } from '../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState('events');
  const [form, setForm] = useState({ title: '', description: '', category: 'concert',
    date: '', location: '', totalSeats: '', availableSeats: '', price: '' });

  useEffect(() => {
    getEvents().then((res) => setEvents(res.data));
    getAllBookings().then((res) => setBookings(res.data)).catch(() => {});
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createEvent(form);
      setEvents([...events, res.data]);
      toast.success('🎉 Event created!');
      setForm({ title: '', description: '', category: 'concert', date: '', location: '', totalSeats: '', availableSeats: '', price: '' });
      setTab('events');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create event');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await deleteEvent(id);
      setEvents(events.filter(e => e._id !== id));
      toast.success('Event deleted');
    } catch {
      toast.error('Failed to delete event');
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'white', fontSize: '0.95rem', outline: 'none', marginBottom: '1rem',
    fontFamily: 'DM Sans'
  };

  const tabs = [
    { id: 'events', label: '📋 Events', count: events.length },
    { id: 'bookings', label: '🎫 Bookings', count: bookings.length },
    { id: 'create', label: '➕ Create Event' },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '7rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          Admin <span style={{ color: '#ff6b35' }}>Dashboard</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your events and bookings</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Total Events', value: events.length, icon: '🎭', color: '#ff6b35' },
          { label: 'Total Bookings', value: bookings.length, icon: '🎫', color: '#ffd700' },
          { label: 'Revenue', value: `$${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}`, icon: '💰', color: '#00d4aa' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px', padding: '1.5rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
            <div style={{ fontFamily: 'Playfair Display', fontSize: '2rem', fontWeight: 900, color }}>{value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {tabs.map(({ id, label, count }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '0.6rem 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s', fontFamily: 'DM Sans',
            background: tab === id ? 'linear-gradient(135deg, #ff6b35, #e55a25)' : 'rgba(255,255,255,0.05)',
            color: tab === id ? 'white' : 'var(--text-muted)',
            boxShadow: tab === id ? '0 4px 15px rgba(255,107,53,0.3)' : 'none'
          }}>
            {label} {count !== undefined && <span style={{ opacity: 0.8 }}>({count})</span>}
          </button>
        ))}
      </div>

      {/* Create Event Form */}
      {tab === 'create' && (
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px', padding: '2.5rem'
        }}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem', marginBottom: '2rem' }}>Create New Event</h2>
          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
              <div style={{ gridColumn: '1/-1' }}>
                <input style={inputStyle} placeholder="Event Title" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                  placeholder="Event Description" value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>
              <select style={inputStyle} value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="concert">🎵 Concert</option>
                <option value="conference">🎤 Conference</option>
                <option value="sports">🏆 Sports</option>
                <option value="other">🎭 Other</option>
              </select>
              <input style={inputStyle} type="datetime-local" value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              <div style={{ gridColumn: '1/-1' }}>
                <input style={inputStyle} placeholder="Location" value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })} required />
              </div>
              <input style={inputStyle} type="number" placeholder="Total Seats" value={form.totalSeats}
                onChange={(e) => setForm({ ...form, totalSeats: e.target.value, availableSeats: e.target.value })} required />
              <input style={inputStyle} type="number" placeholder="Price ($)" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <button type="submit" style={{
              padding: '0.95rem 2.5rem', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #ff6b35, #e55a25)', color: 'white',
              fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(255,107,53,0.35)'
            }}>Create Event →</button>
          </form>
        </div>
      )}

      {/* Events List */}
      {tab === 'events' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No events yet. <button onClick={() => setTab('create')}
                style={{ color: '#ff6b35', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Create one!
              </button>
            </div>
          ) : events.map((event) => (
            <div key={event._id} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '1.5rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
            }}>
              <div>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', marginBottom: '0.4rem' }}>{event.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {event.category} • {event.location} • ${event.price}/seat • {event.availableSeats} seats left
                </p>
              </div>
              <button onClick={() => handleDelete(event._id)} style={{
                background: 'rgba(255,100,100,0.1)', color: '#ff6464',
                border: '1px solid rgba(255,100,100,0.3)', padding: '0.5rem 1.25rem',
                borderRadius: '50px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem'
              }}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* Bookings List */}
      {tab === 'bookings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No bookings yet.</div>
          ) : bookings.map((booking) => (
            <div key={booking._id} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '1.5rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
            }}>
              <div>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                  {booking.event?.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  👤 {booking.user?.name} ({booking.user?.email}) • 💺 {booking.seats} seats
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', fontWeight: 900, color: '#ff6b35' }}>
                  ${booking.totalAmount}
                </div>
                <span style={{
                  padding: '0.2rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700,
                  background: booking.status === 'confirmed' ? 'rgba(0,212,170,0.15)' : 'rgba(255,100,100,0.15)',
                  color: booking.status === 'confirmed' ? '#00d4aa' : '#ff6464'
                }}>{booking.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
