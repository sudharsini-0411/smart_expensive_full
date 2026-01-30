import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate registration success
    navigate('/dashboard')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
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
        <source src="/auth-background.mp4" type="video/mp4" />
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
        borderRadius: '12px', 
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        width: '100%', 
        maxWidth: '400px',
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2d3748' }}>Create Account</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{ 
              padding: '0.75rem', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.8)'
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ 
              padding: '0.75rem', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.8)'
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{ 
              padding: '0.75rem', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.8)'
            }}
            required
          />
          <button type="submit" style={{ 
            padding: '0.75rem', 
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register