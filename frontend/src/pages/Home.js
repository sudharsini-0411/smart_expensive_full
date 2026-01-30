import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Smart Expenses Tracker</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid var(--glass-border)', borderRadius: '4px' }}>
            Login
          </Link>
          <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '4rem' }}>
          <div className="glass-panel" style={{ padding: '4rem 3rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)', lineHeight: '1.2' }}>
              Master Your Money with Smart Expenses
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Experience the future of personal finance. Seamlessly track expenses, manage budgets, and visualize your financial health with our stunning, intuitive platform.
            </p>

            <Link
              to="/register"
              className="btn-primary"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                fontSize: '1.125rem',
                padding: '1rem 2.5rem'
              }}
            >
              Start Tracking Free
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ width: '100%', maxWidth: '1200px', marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Why Choose Us?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--accent-color)' }}>Real-time Analytics</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Gain instant insights into your spending habits with dynamic charts and detailed reports. Understand where every dollar goes in real-time.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--success-color)' }}>Smart Budgeting</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Create custom budgets for different categories. Receive smart alerts before you overspend and stay on track with your financial goals.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--danger-color)' }}>Expense Tracking</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Effortlessly log daily expenses. Categorize transactions, add descriptions, and maintain a digital ledger of your financial life.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--warning-color)' }}>Secure Cloud Sync</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Your data is encrypted and saved to the cloud securely in MongoDB. Access your finances from anywhere, anytime, with peace of mind.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div style={{ width: '100%', maxWidth: '1000px', marginBottom: '4rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>How It Works</h2>
          <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', padding: '3rem' }}>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '1rem' }}>1</div>
              <h3>Sign Up</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Create your free account in seconds.</p>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '1rem' }}>2</div>
              <h3>Add Transactions</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Log your income and expenses easily.</p>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '1rem' }}>3</div>
              <h3>Visualize</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Watch your dashboard come to life.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center', marginBottom: '2rem' }}>
          <div className="glass-panel" style={{ padding: '3rem', background: 'rgba(37, 99, 235, 0.2)', borderColor: 'var(--primary-color)' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Ready to Take Charge?</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'white' }}>
              Join thousands of users who are managing their money better every day.
            </p>
            <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 3rem', fontSize: '1.2rem' }}>
              Join for Free
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;