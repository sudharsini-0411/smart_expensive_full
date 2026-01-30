import { useState, useEffect } from 'react'

function Dashboard() {
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 })
  const [recentTransactions, setRecentTransactions] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('expenses') || '[]')
    
    const income = data.filter(item => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
    const expenses = data.filter(item => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
    
    setSummary({ income, expenses, balance: income - expenses })
    setRecentTransactions(data.slice(-5).reverse())
  }, [])

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
        <source src="/dashboard-background.mp4" type="video/mp4" />
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
      
      <h1 style={{ color: 'white', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ color: '#22c55e' }}>Total Income</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${summary.income.toFixed(2)}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ color: '#ef4444' }}>Total Expenses</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${summary.expenses.toFixed(2)}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ color: '#3b82f6' }}>Balance</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: summary.balance >= 0 ? '#22c55e' : '#ef4444' }}>${summary.balance.toFixed(2)}</p>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '2rem', borderRadius: '12px', backdropFilter: 'blur(10px)', position: 'relative', zIndex: 1 }}>
        <h3>Recent Transactions</h3>
        <div style={{ marginTop: '1rem' }}>
          {recentTransactions.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6b7280' }}>
              <p>No transactions yet. Start by adding your first expense or income.</p>
            </div>
          ) : (
            recentTransactions.map(transaction => (
              <div key={transaction.id} style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
                <span>{transaction.description || transaction.category}</span>
                <span style={{ color: transaction.type === 'income' ? '#22c55e' : '#ef4444' }}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard