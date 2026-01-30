function Logout() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1
        }}
      >
        <source src="/dashboard-background.mp4" type="video/mp4" />
      </video>
      
      {/* Video Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 0
      }}></div>
      
      <div style={{ 
        background: 'rgba(255,255,255,0.95)', 
        padding: '3rem', 
        borderRadius: '8px', 
        textAlign: 'center',
        maxWidth: '400px',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👋</div>
        <h2 style={{ marginBottom: '1rem' }}>Logging you out...</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          Thank you for using Smart Expenses Tracker. You will be redirected shortly.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ 
            flex: 1,
            padding: '0.75rem', 
            background: '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px'
          }}>
            Logout Now
          </button>
          <button style={{ 
            flex: 1,
            padding: '0.75rem', 
            background: '#6b7280', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px'
          }}>
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  )
}

export default Logout