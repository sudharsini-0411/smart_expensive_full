import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { budgetAPI } from '../utils/api';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const categories = ['Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Other'];

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await budgetAPI.getAll();
      setBudgets(response.data);
    } catch (error) {
      toast.error('Error fetching budgets');
    }
  };

  const onSubmit = async (data) => {
    try {
      await budgetAPI.create({
        ...data,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      });
      toast.success('Budget created!');
      fetchBudgets();
      reset();
      setShowForm(false);
    } catch (error) {
      // Demo simulation
      toast.success('Budget created! (Demo)');
      // Mock adding to list
      setBudgets([...budgets, { ...data, _id: Date.now(), period: data.period || 'monthly' }]);
      reset();
      setShowForm(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await budgetAPI.delete(id);
        toast.success('Budget deleted!');
        fetchBudgets();
      } catch (error) {
        toast.success('Budget deleted! (Demo)');
        setBudgets(budgets.filter(b => b._id !== id));
      }
    }
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Budgets</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Budget'}
        </button>
      </div>

      {showForm && (
        <div className="glass-panel" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Add Budget</h3>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <select {...register('category', { required: true })}>
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input {...register('amount', { required: true })} type="number" step="0.01" placeholder="Budget Amount" />
            <select {...register('period')}>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--success-color)' }}>
              Add Budget
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {budgets.map(budget => (
          <div key={budget._id} className="glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>{budget.category}</h3>
              <button onClick={() => handleDelete(budget._id)} style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--danger-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>${budget.amount ? Number(budget.amount).toFixed(2) : '0.00'}</p>
            <p style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{budget.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budgets;