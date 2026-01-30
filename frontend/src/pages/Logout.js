import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  const handleLogoutNow = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f3f4f6' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '3rem', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👋</div>
        <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>Logging you out...</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          Thank you for using Smart Expenses Tracker. You will be redirected to the home page in a few seconds.
        </p>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: '#e5e7eb', 
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: '#2563eb',
              animation: 'progress 3s linear forwards'
            }}></div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={handleLogoutNow}
            style={{ 
              flex: 1,
              padding: '0.75rem', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Logout Now
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{ 
              flex: 1,
              padding: '0.75rem', 
              backgroundColor: '#6b7280', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Stay Logged In
          </button>
        </div>

        <style>
          {`
            @keyframes progress {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Logout;