import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerAPI(form);
      login(res.data.token, res.data.user);
      toast.success('Account created!');
      navigate('/events');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', bottom: '30%', right: '20%', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)'
      }} />

      <div style={{
        width: '100%', maxWidth: '440px', zIndex: 1,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px', padding: '2.5rem', backdropFilter: 'blur(20px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✨</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Join EventBook
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Create your account to start booking</p>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { field: 'name', type: 'text', placeholder: 'Your full name' },
            { field: 'email', type: 'email', placeholder: 'you@example.com' },
            { field: 'password', type: 'password', placeholder: '••••••••' },
          ].map(({ field, type, placeholder }) => (
            <div key={field} style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                {field}
              </label>
              <input type={type} placeholder={placeholder} value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })} required
                style={{
                  width: '100%', padding: '0.85rem 1rem', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box'
                }}
                onFocus={e => e.target.style.borderColor = '#ff6b35'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          ))}

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600,
              color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Account Type</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['user', 'admin'].map(role => (
                <button key={role} type="button" onClick={() => setForm({ ...form, role })} style={{
                  flex: 1, padding: '0.75rem', borderRadius: '12px', border: '1px solid',
                  borderColor: form.role === role ? '#ff6b35' : 'rgba(255,255,255,0.1)',
                  background: form.role === role ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.05)',
                  color: form.role === role ? '#ff6b35' : 'var(--text-muted)',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', textTransform: 'capitalize',
                  transition: 'all 0.2s'
                }}>{role === 'user' ? '👤 User' : '⚙️ Admin'}</button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '0.95rem', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #ff6b35, #e55a25)', color: 'white',
            fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(255,107,53,0.35)', marginTop: '0.5rem',
            opacity: loading ? 0.7 : 1
          }}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#ff6b35', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
