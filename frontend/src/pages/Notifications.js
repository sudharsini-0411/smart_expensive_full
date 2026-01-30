import React, { useState, useEffect } from 'react';
import { budgetAPI } from '../utils/api';

const Notifications = () => {
  const [alerts, setAlerts] = useState([]);
  const [notifications] = useState([
    { id: 1, type: 'budget', message: 'You have exceeded your Food budget by 15%', date: new Date(), read: false },
    { id: 2, type: 'reminder', message: 'Monthly budget review reminder', date: new Date(Date.now() - 86400000), read: true },
    { id: 3, type: 'achievement', message: 'Congratulations! You saved $500 this month', date: new Date(Date.now() - 172800000), read: false },
    { id: 4, type: 'budget', message: 'Shopping budget is 80% used', date: new Date(Date.now() - 259200000), read: true }
  ]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await budgetAPI.getAlerts();
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'budget': return 'Alert';
      case 'reminder': return 'Note';
      case 'achievement': return 'Star';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'budget': return 'var(--danger-color)';
      case 'reminder': return 'var(--accent-color)';
      case 'achievement': return 'var(--success-color)';
      default: return 'var(--secondary-color)';
    }
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>Notifications & Alerts</h1>

      {/* Budget Alerts */}
      {alerts.length > 0 && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--danger-color)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--danger-color)' }}>Budget Alerts</h2>
          {alerts.map((alert, index) => (
            <div key={index} style={{
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              border: `1px solid ${alert.exceeded ? 'var(--danger-color)' : 'var(--warning-color)'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{alert.category}</strong> - {alert.percentage}% of budget used
                  {alert.exceeded && <span style={{ color: 'var(--danger-color)', marginLeft: '0.5rem', fontWeight: 'bold' }}>(EXCEEDED!)</span>}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  ${alert.spent.toFixed(2)} / ${alert.budgetAmount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Notifications */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <h2 style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.1)', margin: 0, borderBottom: '1px solid var(--glass-border)' }}>All Notifications</h2>
        <div>
          {notifications.map(notification => (
            <div
              key={notification.id}
              style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--glass-border)',
                backgroundColor: notification.read ? 'transparent' : 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ fontSize: '1.5rem' }}>
                {getNotificationIcon(notification.type)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: notification.read ? 'normal' : 'bold' }}>
                  {notification.message}
                </p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  {notification.date.toLocaleDateString()} at {notification.date.toLocaleTimeString()}
                </p>
              </div>
              <div style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                backgroundColor: getNotificationColor(notification.type),
                color: 'white'
              }}>
                {notification.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Notification Settings</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" defaultChecked style={{ width: 'auto', marginBottom: 0 }} />
            Budget exceeded alerts
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" defaultChecked style={{ width: 'auto', marginBottom: 0 }} />
            Budget threshold warnings (80% usage)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" defaultChecked style={{ width: 'auto', marginBottom: 0 }} />
            Monthly spending summaries
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" style={{ width: 'auto', marginBottom: 0 }} />
            Weekly expense reminders
          </label>
          <button className="btn-primary" style={{ marginTop: '1rem', width: 'fit-content' }}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;