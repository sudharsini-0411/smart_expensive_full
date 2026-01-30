import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { transactionAPI } from '../utils/api';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState({ category: '', search: '' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await transactionAPI.getAll({ type: 'expense' });
      setExpenses(response.data.transactions);
    } catch (error) {
      // Demo mock data
      const mockExpenses = [
        { _id: '1', date: new Date().toISOString(), type: 'expense', category: 'Food', description: 'Grocery Shopping', amount: 120.50 },
        { _id: '3', date: new Date(Date.now() - 172800000).toISOString(), type: 'expense', category: 'Travel', description: 'Uber Ride', amount: 25.00 },
        { _id: '4', date: new Date(Date.now() - 259200000).toISOString(), type: 'expense', category: 'Entertainment', description: 'Movie Night', amount: 45.00 },
        { _id: '5', date: new Date(Date.now() - 345600000).toISOString(), type: 'expense', category: 'Shopping', description: 'New Shoes', amount: 89.99 },
      ];
      setExpenses(mockExpenses);
      toast.info('Demo Mode: Loaded mock expenses');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this expense?')) {
      try {
        await transactionAPI.delete(id);
        toast.success('Expense deleted!');
        fetchExpenses();
      } catch (error) {
        toast.success('Expense deleted! (Demo)');
        setExpenses(prev => prev.filter(e => e._id !== id));
      }
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = !filter.category || expense.category === filter.category;
    const matchesSearch = !filter.search || expense.description?.toLowerCase().includes(filter.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Expense List</h1>
        <Link to="/add-expense" className="btn-primary" style={{ backgroundColor: 'var(--danger-color)', textDecoration: 'none' }}>
          Add Expense
        </Link>
      </div>

      {/* Filters */}
      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search expenses..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          style={{ flex: 1 }}
        />
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Expense List */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>Category</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>Description</th>
              <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid var(--glass-border)' }}>Amount</th>
              <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--glass-border)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(expense => (
              <tr key={expense._id}>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>{expense.category}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>{expense.description}</td>
                <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid var(--glass-border)', color: 'var(--danger-color)' }}>
                  ${expense.amount.toFixed(2)}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--glass-border)' }}>
                  <button className="btn-primary" style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(expense._id)} className="btn-primary" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--danger-color)', fontSize: '0.875rem' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;