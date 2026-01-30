import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>About Smart Expenses Tracker</h1>

        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>Our Mission</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            Smart Expenses Tracker is designed to help individuals take control of their personal finances through
            intelligent expense tracking, budget management, and insightful financial analytics. Our goal is to make
            financial management simple, accessible, and effective for everyone.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>Key Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: '4px' }}>
              <h3 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>Real-time Analytics</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Interactive charts and visualizations to understand your spending patterns</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px' }}>
              <h3 style={{ color: 'var(--success-color)', marginBottom: '0.5rem' }}>Budget Management</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Set monthly budgets and receive alerts when limits are exceeded</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px' }}>
              <h3 style={{ color: 'var(--danger-color)', marginBottom: '0.5rem' }}>Expense Tracking</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Easy-to-use interface for adding and categorizing expenses</p>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>Contact & Support</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Get Help</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>📧 support@smartexpenses.com</p>
              <p style={{ color: 'var(--text-secondary)' }}>📱 +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;