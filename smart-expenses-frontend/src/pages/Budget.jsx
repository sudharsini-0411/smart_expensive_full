import { useState, useEffect } from 'react'

function Budget() {
  const [budgets, setBudgets] = useState([])
  const [formData, setFormData] = useState({ category: '', amount: '', period: 'monthly' })

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('budgets') || '[]')
    setBudgets(data)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBudget = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
    const updated = [...budgets, newBudget]
    setBudgets(updated)
    localStorage.setItem('budgets', JSON.stringify(updated))
    setFormData({ category: '', amount: '', period: 'monthly' })
    alert('Budget created successfully!')
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this budget?')) {
      const updated = budgets.filter(b => b.id !== id)
      setBudgets(updated)
      localStorage.setItem('budgets', JSON.stringify(updated))
    }
  }

  const getBudgetStatus = (budget) => {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')
    const spent = expenses
      .filter(e => e.type === 'expense' && e.category === budget.category)
      .reduce((sum, e) => sum + e.amount, 0)
    const percentage = (spent / budget.amount) * 100
    return { spent, percentage, exceeded: percentage > 100 }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)', padding: '2rem' }}>
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>Budget Management</h1>
      
      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '2rem', borderRadius: '12px', backdropFilter: 'blur(10px)', marginBottom: '2rem' }}>
        <h3>Add New Budget</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          <input 
            type="number" 
            step="0.01"
            placeholder="Budget Amount" 
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
          <select 
            value={formData.period}
            onChange={(e) => setFormData({...formData, period: e.target.value})}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button type="submit" style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add Budget
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {budgets.length === 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '12px', padding: '2rem', backdropFilter: 'blur(10px)', textAlign: 'center', gridColumn: '1 / -1' }}>
            <p style={{ color: '#6b7280' }}>No budgets set yet. Create your first budget to start tracking your spending.</p>
          </div>
        ) : (
          budgets.map(budget => {
            const status = getBudgetStatus(budget)
            return (
              <div key={budget.id} style={{ background: 'rgba(255,255,255,0.95)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3>{budget.category}</h3>
                  <button onClick={() => handleDelete(budget.id)} style={{ padding: '0.25rem 0.5rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>${budget.amount.toFixed(2)}</p>
                <div style={{ background: '#e5e7eb', borderRadius: '4px', height: '8px', marginTop: '1rem' }}>
                  <div style={{ 
                    background: status.exceeded ? '#ef4444' : status.percentage > 80 ? '#f59e0b' : '#22c55e', 
                    width: `${Math.min(status.percentage, 100)}%`, 
                    height: '100%', 
                    borderRadius: '4px' 
                  }}></div>
                </div>
                <p style={{ marginTop: '0.5rem', color: status.exceeded ? '#ef4444' : '#6b7280' }}>
                  ${status.spent.toFixed(2)} / ${budget.amount.toFixed(2)} ({status.percentage.toFixed(1)}%)
                  {status.exceeded && <span style={{ fontWeight: 'bold' }}> - EXCEEDED!</span>}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', textTransform: 'capitalize' }}>{budget.period}</p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Budget