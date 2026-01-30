function Profile() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile Settings</h1>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '600px' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name</label>
            <input type="text" defaultValue="John Doe" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
            <input type="email" defaultValue="john@example.com" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone</label>
            <input type="tel" placeholder="Phone number" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <button type="submit" style={{ padding: '0.75rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile