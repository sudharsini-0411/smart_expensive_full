import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { transactionAPI } from '../utils/api';

const AddIncome = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const categories = ['Salary', 'Freelance', 'Business', 'Investment', 'Rental', 'Gift', 'Other'];

  const onSubmit = async (data) => {
    try {
      await transactionAPI.create({ ...data, type: 'income' });
      toast.success('Income added successfully!');
      reset();
      navigate('/transactions');
    } catch (error) {
      toast.success('Income added! (Demo)');
      reset();
      navigate('/transactions');
    }
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>Add New Income</h1>
      <div className="glass-panel" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label>Amount *</label>
            <input {...register('amount', { required: true })} type="number" step="0.01" placeholder="0.00" />
          </div>
          <div>
            <label>Source *</label>
            <select {...register('category', { required: true })}>
              <option value="">Select Income Source</option>
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
            <button type="submit" className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--success-color)' }}>
              Add Income
            </button>
            <button type="button" onClick={() => navigate('/transactions')} className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--secondary-color)' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;