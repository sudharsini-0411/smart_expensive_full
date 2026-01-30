function About() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>About Smart Expenses Tracker</h1>
        
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb', marginBottom: '1rem' }}>🎯 Our Mission</h2>
          <p style={{ lineHeight: '1.6', color: '#4b5563' }}>
            Smart Expenses Tracker is designed to help individuals take control of their personal finances through 
            intelligent expense tracking, budget management, and insightful financial analytics.
          </p>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb', marginBottom: '1rem' }}>🛠️ Technology Stack</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <h3>Frontend</h3>
              <ul style={{ paddingLeft: '1rem' }}>
                <li>React.js</li>
                <li>Vite</li>
                <li>React Router</li>
              </ul>
            </div>
            <div>
              <h3>Backend</h3>
              <ul style={{ paddingLeft: '1rem' }}>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ color: '#2563eb', marginBottom: '1rem' }}>📞 Contact</h2>
          <p>📧 support@smartexpenses.com</p>
          <p>📱 +1 (555) 123-4567</p>
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>© 2024 Smart Expenses Tracker. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default About