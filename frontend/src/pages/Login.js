import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginAPI(form);
      login(res.data.token, res.data.user);
      toast.success('Welcome back!');
      navigate('/events');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
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
        position: 'absolute', top: '30%', left: '20%', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)'
      }} />

      <div style={{
        width: '100%', maxWidth: '440px', zIndex: 1,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px', padding: '2.5rem', backdropFilter: 'blur(20px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎫</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Welcome Back
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sign in to your EventBook account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {['email', 'password'].map((field) => (
            <div key={field} style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                {field}
              </label>
              <input
                type={field}
                placeholder={field === 'email' ? 'you@example.com' : '••••••••'}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required
                style={{
                  width: '100%', padding: '0.85rem 1rem', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#ff6b35'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          ))}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '0.95rem', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #ff6b35, #e55a25)', color: 'white',
            fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(255,107,53,0.35)', marginTop: '0.5rem',
            opacity: loading ? 0.7 : 1
          }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#ff6b35', fontWeight: 600 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
