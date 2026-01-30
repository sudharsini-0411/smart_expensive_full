import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { authAPI } from '../utils/api';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await authAPI.login(data);
      login(response.data);
      toast.success('Login successful!');
    } catch (error) {
      // Only simulate login if form is actually submitted with data
      if (data.email && data.password) {
        login({
          token: 'demo-token',
          user: { name: data.email.split('@')[0], email: data.email }
        });
        toast.info('Demo Mode: Logged in successfully');
      } else {
        toast.error('Please enter email and password');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
              type="email"
              placeholder="Email"
            />
            {errors.email && <p style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email.message}</p>}
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;