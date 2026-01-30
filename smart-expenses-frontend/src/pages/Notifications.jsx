import { useState, useEffect } from 'react'

function Notifications() {
  const [alerts, setAlerts] = useState([])
  const [settings, setSettings] = useState({
    budgetAlerts: true,
    monthlyReports: true,
    smsNotifications: false,
    weeklyReminders: false
  })

  useEffect(() => {
    generateAlerts()
  }, [])

  const generateAlerts = () => {
    const budgets = JSON.parse(localStorage.getItem('budgets') || '[]')
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')
    const newAlerts = []

    // Budget alerts
    budgets.forEach(budget => {
      const spent = expenses
        .filter(e => e.type === 'expense' && e.category === budget.category)
        .reduce((sum, e) => sum + e.amount, 0)
      const percentage = (spent / budget.amount) * 100

      if (percentage >= 100) {
        newAlerts.push({
          id: Date.now() + Math.random(),
          type: 'error',
          title: 'Budget Exceeded!',
          message: `You have exceeded your ${budget.category} budget by ${(percentage - 100).toFixed(1)}%`,
          time: 'Just now',
          read: false
        })
      } else if (percentage >= 80) {
        newAlerts.push({
          id: Date.now() + Math.random(),
          type: 'warning',
          title: 'Budget Alert',
          message: `You have used ${percentage.toFixed(1)}% of your ${budget.category} budget`,
          time: '1 hour ago',
          read: false
        })
      }
    })

    // General notifications
    if (expenses.length > 0) {
      const thisMonth = expenses.filter(e => {
        const date = new Date(e.date)
        const now = new Date()
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      })
      
      if (thisMonth.length > 0) {
        const totalSpent = thisMonth.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0)
        newAlerts.push({
          id: Date.now() + Math.random(),
          type: 'info',
          title: 'Monthly Summary',
          message: `You have spent $${totalSpent.toFixed(2)} this month across ${thisMonth.length} transactions`,
          time: '2 hours ago',
          read: true
        })
      }
    }

    // Achievement notifications
    const totalSavings = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0) - 
                        expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0)
    
    if (totalSavings > 0) {
      newAlerts.push({
        id: Date.now() + Math.random(),
        type: 'success',
        title: 'Great Job!',
        message: `You have saved $${totalSavings.toFixed(2)} so far. Keep up the good work!`,
        time: '1 day ago',
        read: false
      })
    }

    setAlerts(newAlerts)
  }

  const markAsRead = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ))
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return '❌'
      case 'warning': return '⚠️'
      case 'success': return '✅'
      case 'info': return 'ℹ️'
      default: return '🔔'
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return '#ef4444'
      case 'warning': return '#f59e0b'
      case 'success': return '#22c55e'
      case 'info': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)', padding: '2rem' }}>
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>Notifications & Alerts</h1>

      {/* Active Alerts */}
      <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '12px', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ padding: '1.5rem', backgroundColor: '#f3f4f6', margin: 0, borderRadius: '12px 12px 0 0' }}>Active Alerts</h2>
        {alerts.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            No notifications yet. You'll receive alerts here when you set up budgets and add transactions.
          </div>
        ) : (
          <div>
            {alerts.map(alert => (
              <div 
                key={alert.id}
                onClick={() => markAsRead(alert.id)}
                style={{ 
                  padding: '1rem 1.5rem', 
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: alert.read ? 'white' : '#f0f9ff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ 
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: getAlertColor(alert.type),
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  {getAlertIcon(alert.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: alert.read ? 'normal' : 'bold', marginBottom: '0.25rem' }}>
                    {alert.title}
                  </div>
                  <p style={{ margin: 0, color: '#4b5563' }}>
                    {alert.message}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    {alert.time}
                  </p>
                </div>
                <div style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem',
                  backgroundColor: getAlertColor(alert.type),
                  color: 'white',
                  textTransform: 'uppercase'
                }}>
                  {alert.type}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ padding: '1.5rem', backgroundColor: '#f3f4f6', margin: 0, borderRadius: '12px 12px 0 0' }}>Notification Settings</h2>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={settings.budgetAlerts}
                onChange={(e) => setSettings({...settings, budgetAlerts: e.target.checked})}
              />
              Budget exceeded alerts
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={settings.monthlyReports}
                onChange={(e) => setSettings({...settings, monthlyReports: e.target.checked})}
              />
              Monthly spending summaries
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={settings.weeklyReminders}
                onChange={(e) => setSettings({...settings, weeklyReminders: e.target.checked})}
              />
              Weekly expense reminders
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={settings.smsNotifications}
                onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
              />
              SMS notifications
            </label>
          </div>
          <button 
            onClick={() => {
              localStorage.setItem('notificationSettings', JSON.stringify(settings))
              alert('Settings saved!')
            }}
            style={{ 
              padding: '0.75rem 2rem', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notifications