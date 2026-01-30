import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, Defaults } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { transactionAPI, budgetAPI } from '../utils/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Set default chart colors for dark theme
ChartJS.defaults.color = '#ffffff';
ChartJS.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, alertsRes] = await Promise.all([
        transactionAPI.getAnalytics(),
        budgetAPI.getAlerts()
      ]);

      setAnalytics(analyticsRes.data);
      setAlerts(alertsRes.data);

      const income = analyticsRes.data.filter(item => item._id.type === 'income').reduce((sum, item) => sum + item.total, 0);
      const expenses = analyticsRes.data.filter(item => item._id.type === 'expense').reduce((sum, item) => sum + item.total, 0);
      setSummary({ income, expenses, balance: income - expenses });
    } catch (error) {
      // Mock data when backend is not available
      const mockAnalytics = [
        { _id: { type: 'expense', category: 'Food' }, total: 500, count: 15 },
        { _id: { type: 'expense', category: 'Travel' }, total: 300, count: 5 },
        { _id: { type: 'expense', category: 'Shopping' }, total: 200, count: 8 },
        { _id: { type: 'income', category: 'Salary' }, total: 3000, count: 1 }
      ];
      const mockAlerts = [
        { category: 'Food', percentage: 85, spent: 425, budgetAmount: 500, exceeded: false }
      ];

      setAnalytics(mockAnalytics);
      setAlerts(mockAlerts);
      setSummary({ income: 3000, expenses: 1000, balance: 2000 });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel">Loading dashboard...</div>
      </div>
    );
  }

  const expenseData = analytics.filter(item => item._id.type === 'expense');

  const chartData = {
    labels: expenseData.map(item => item._id.category),
    datasets: [{
      data: expenseData.map(item => item.total),
      backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'],
      borderWidth: 0
    }]
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3 style={{ color: 'var(--success-color)', marginBottom: '0.5rem' }}>Total Income</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${summary.income.toFixed(2)}</p>
        </div>
        <div className="glass-panel">
          <h3 style={{ color: 'var(--danger-color)', marginBottom: '0.5rem' }}>Total Expenses</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${summary.expenses.toFixed(2)}</p>
        </div>
        <div className="glass-panel">
          <h3 style={{ color: summary.balance >= 0 ? 'var(--success-color)' : 'var(--danger-color)', marginBottom: '0.5rem' }}>Balance</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${summary.balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="glass-panel" style={{ border: '1px solid var(--danger-color)', backgroundColor: 'rgba(239, 68, 68, 0.1)', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>Budget Alerts</h3>
          {alerts.map((alert, index) => (
            <div key={index} style={{ marginBottom: '0.5rem' }}>
              <strong>{alert.category}</strong>: {alert.percentage}% of budget used
              {alert.exceeded && <span style={{ color: 'var(--danger-color)', fontWeight: 'bold' }}> (EXCEEDED!)</span>}
            </div>
          ))}
        </div>
      )}

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {expenseData.length > 0 && (
          <div className="glass-panel">
            <h3 style={{ marginBottom: '1rem' }}>Expenses by Category</h3>
            <div style={{ height: '300px' }}>
              <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;