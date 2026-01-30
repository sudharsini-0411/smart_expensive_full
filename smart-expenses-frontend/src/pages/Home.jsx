import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      position: 'relative',
      overflow: 'hidden'
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
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      
      {/* Video Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.4)',
        zIndex: 0
      }}></div>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      {/* Hero Section */}
      <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Smart Expenses Tracker
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', marginBottom: '2rem', opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Take control of your finances with intelligent expense tracking
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/register')}
            style={{ 
              padding: '1rem 2rem', 
              fontSize: '1.1rem', 
              background: 'rgba(255,255,255,0.9)', 
              color: '#2563eb', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}>
            Get Started Free
          </button>
          <button 
            onClick={() => navigate('/about')}
            style={{ 
              padding: '1rem 2rem', 
              fontSize: '1.1rem', 
              background: 'rgba(255,255,255,0.1)', 
              color: 'white', 
              border: '2px solid rgba(255,255,255,0.8)', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}>
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ background: 'rgba(0,0,0,0.6)', padding: '4rem 2rem', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '3rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Why Choose Smart Expenses Tracker?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Real-time Analytics', desc: 'Interactive charts and visualizations to understand your spending patterns', nav: '/dashboard', icon: 'RT', gradient: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)' },
              { title: 'Smart Budget Management', desc: 'Set monthly and category-wise budgets with intelligent alerts', nav: '/budget', icon: 'BM', gradient: 'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)' },
              { title: 'Easy Expense Tracking', desc: 'Quickly add, categorize, and manage your expenses', nav: '/add-expense', icon: 'ET', gradient: 'linear-gradient(45deg, #fa709a 0%, #fee140 100%)' },
              { title: 'Detailed Reports', desc: 'Generate comprehensive monthly and yearly financial reports', nav: '/reports', icon: 'DR', gradient: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)' },
              { title: 'Smart Notifications', desc: 'Receive timely alerts and reminders about budget limits', nav: '/notifications', icon: 'SN', gradient: 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)' },
              { title: 'Secure & Private', desc: 'Your financial data is protected with bank-level security', nav: '/profile', icon: 'SP', gradient: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)' }
            ].map((feature, index) => (
              <div 
                key={index}
                onClick={() => navigate(feature.nav)}
                style={{ 
                  background: 'rgba(255,255,255,0.95)', 
                  padding: '2rem', 
                  borderRadius: '12px', 
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                <div style={{ width: '60px', height: '60px', background: feature.gradient, borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white', fontWeight: 'bold' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2d3748' }}>{feature.title}</h3>
                <p style={{ color: '#718096', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ background: 'rgba(0,0,0,0.6)', padding: '4rem 2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Ready to Take Control of Your Finances?
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Join thousands of users who are already managing their money smarter
        </p>
        <button 
          onClick={() => navigate('/register')}
          style={{ 
            padding: '1rem 3rem', 
            fontSize: '1.2rem', 
            background: 'rgba(255,255,255,0.9)', 
            color: '#2563eb', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}>
          Start Your Free Trial
        </button>
      </div>
    </div>
  )
}

export default Home