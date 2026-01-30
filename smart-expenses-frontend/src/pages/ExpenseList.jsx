import { useState, useEffect } from 'react'

function ExpenseList() {
  const [expenses, setExpenses] = useState([])
  const [filter, setFilter] = useState({ category: '', search: '' })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('expenses') || '[]')
    setExpenses(data.filter(item => item.type === 'expense'))
  }, [])

  const handleDelete = (id) => {
    if (window.confirm('Delete this expense?')) {
      const allData = JSON.parse(localStorage.getItem('expenses') || '[]')
      const updated = allData.filter(item => item.id !== id)
      localStorage.setItem('expenses', JSON.stringify(updated))
      setExpenses(updated.filter(item => item.type === 'expense'))
    }
  }

  const handleEdit = (expense) => {
    setEditingId(expense.id)
    setEditForm(expense)
  }

  const handleSaveEdit = () => {
    const allData = JSON.parse(localStorage.getItem('expenses') || '[]')
    const updated = allData.map(item => 
      item.id === editingId ? { ...editForm, amount: parseFloat(editForm.amount) } : item
    )
    localStorage.setItem('expenses', JSON.stringify(updated))
    setExpenses(updated.filter(item => item.type === 'expense'))
    setEditingId(null)
    alert('Expense updated successfully!')
  }

  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = !filter.category || expense.category === filter.category
    const matchesSearch = !filter.search || expense.description?.toLowerCase().includes(filter.search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedExpenses = filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div style={{ minHeight: '100vh', position: 'relative', padding: '2rem' }}>
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1
        }}
      >
        <source src="/expense-background.mp4" type="video/mp4" />
      </video>
      
      {/* Video Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.4)',
        zIndex: 0
      }}></div>
      
      <h1 style={{ color: 'white', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>Expense List</h1>
      
      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', backdropFilter: 'blur(10px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search expenses..." 
            value={filter.search}
            onChange={(e) => setFilter({...filter, search: e.target.value})}
            style={{ flex: 1, minWidth: '200px', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
          />
          <select 
            value={filter.category}
            onChange={(e) => setFilter({...filter, category: e.target.value})}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '12px', backdropFilter: 'blur(10px)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        {sortedExpenses.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            No expenses found. Add your first expense to get started.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f3f4f6' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map(expense => (
                <tr key={expense.id}>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                    {editingId === expense.id ? (
                      <input 
                        type="date" 
                        value={editForm.date}
                        onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                        style={{ padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    ) : (
                      new Date(expense.date).toLocaleDateString()
                    )}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                    {editingId === expense.id ? (
                      <select 
                        value={editForm.category}
                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                        style={{ padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
                      >
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      expense.category
                    )}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                    {editingId === expense.id ? (
                      <input 
                        type="text" 
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        style={{ padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                      />
                    ) : (
                      expense.description
                    )}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb', color: '#ef4444' }}>
                    {editingId === expense.id ? (
                      <input 
                        type="number" 
                        step="0.01"
                        value={editForm.amount}
                        onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                        style={{ padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px', width: '80px', textAlign: 'right' }}
                      />
                    ) : (
                      `$${expense.amount.toFixed(2)}`
                    )}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
                    {editingId === expense.id ? (
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button onClick={handleSaveEdit} style={{ padding: '0.25rem 0.5rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Save
                        </button>
                        <button onClick={() => setEditingId(null)} style={{ padding: '0.25rem 0.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button onClick={() => handleEdit(expense)} style={{ padding: '0.25rem 0.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(expense.id)} style={{ padding: '0.25rem 0.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ExpenseList