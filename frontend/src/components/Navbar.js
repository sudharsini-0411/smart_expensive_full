import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <nav className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/dashboard" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>Smart Expenses</Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.5rem' }}>Dashboard</Link>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', fontSize: '1rem' }}
          >
            Transactions ▼
          </button>
          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              padding: '0.5rem',
              minWidth: '180px',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              background: 'rgba(30, 41, 59, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
            }}>
              <Link to="/transactions" style={{ display: 'block', padding: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', borderRadius: '4px' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.3)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>All Transactions</Link>
              <Link to="/add-expense" style={{ display: 'block', padding: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', borderRadius: '4px' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.3)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Add Expense</Link>
              <Link to="/expense-list" style={{ display: 'block', padding: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', borderRadius: '4px' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.3)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Expense List</Link>
              <Link to="/add-income" style={{ display: 'block', padding: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', borderRadius: '4px' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.3)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Add Income</Link>
            </div>
          )}
        </div>

        <Link to="/budgets" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.5rem' }}>Budgets</Link>
        <Link to="/reports" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.5rem' }}>Reports</Link>
        <Link to="/notifications" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.5rem' }}>Alerts</Link>
        <Link to="/profile" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.5rem' }}>Profile</Link>
        <Link to="/about" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.5rem' }}>About</Link>

        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--danger-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;