import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { transactionAPI } from '../utils/api';

const AddExpense = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const categories = ['Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Other'];

  const onSubmit = async (data) => {
    try {
      await transactionAPI.create({ ...data, type: 'expense' });
      toast.success('Expense added successfully!');
      reset();
      navigate('/expense-list');
    } catch (error) {
      // Demo mode simulation
      toast.success('Expense added successfully! (Demo)');
      reset();
      navigate('/expense-list');
    }
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px' }}>
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Add New Expense</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label>Amount *</label>
            <input {...register('amount', { required: true })} type="number" step="0.01" placeholder="0.00" />
          </div>
          <div>
            <label>Category *</label>
            <select {...register('category', { required: true })}>
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label>Description</label>
            <input {...register('description')} placeholder="Enter description" />
          </div>
          <div>
            <label>Date</label>
            <input {...register('date')} type="date" />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--danger-color)' }}>
              Add Expense
            </button>
            <button type="button" onClick={() => navigate('/expense-list')} className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--secondary-color)' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;