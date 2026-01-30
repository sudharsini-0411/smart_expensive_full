import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../App';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuth();
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.user?.name || '',
      email: user?.user?.email || ''
    }
  });

  const onSubmitProfile = async (data) => {
    toast.success('Profile updated successfully!');
  };

  const onSubmitPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password updated successfully!');
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>Profile Settings</h1>

      {/* Tabs */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)' }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '1rem 2rem',
              border: 'none',
              backgroundColor: activeTab === 'profile' ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: activeTab === 'profile' ? 'var(--accent-color)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: activeTab === 'profile' ? 'bold' : 'normal',
              flex: 1
            }}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('password')}
            style={{
              padding: '1rem 2rem',
              border: 'none',
              backgroundColor: activeTab === 'password' ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: activeTab === 'password' ? 'var(--accent-color)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: activeTab === 'password' ? 'bold' : 'normal',
              flex: 1
            }}
          >
            Change Password
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            style={{
              padding: '1rem 2rem',
              border: 'none',
              backgroundColor: activeTab === 'preferences' ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: activeTab === 'preferences' ? 'var(--accent-color)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: activeTab === 'preferences' ? 'bold' : 'normal',
              flex: 1
            }}
          >
            Preferences
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit(onSubmitProfile)} style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Full Name</label>
                <input {...register('name')} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Email</label>
                <input {...register('email')} type="email" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Phone</label>
                <input {...register('phone')} />
              </div>
              <button type="submit" className="btn-primary">
                Update Profile
              </button>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handleSubmit(onSubmitPassword)} style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Current Password</label>
                <input {...register('currentPassword')} type="password" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>New Password</label>
                <input {...register('newPassword')} type="password" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Confirm New Password</label>
                <input {...register('confirmPassword')} type="password" />
              </div>
              <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--danger-color)' }}>
                Change Password
              </button>
            </form>
          )}

          {activeTab === 'preferences' && (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked style={{ width: 'auto', marginBottom: 0 }} />
                  Email notifications for budget alerts
                </label>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked style={{ width: 'auto', marginBottom: 0 }} />
                  Monthly expense reports
                </label>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" style={{ width: 'auto', marginBottom: 0 }} />
                  SMS notifications
                </label>
              </div>
              <button className="btn-primary">
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;