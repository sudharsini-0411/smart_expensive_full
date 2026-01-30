import { useState, useEffect } from 'react'

function Reports() {
  const [reportData, setReportData] = useState({ income: 0, expenses: 0, transactions: [] })
  const [filter, setFilter] = useState({ year: new Date().getFullYear(), month: '' })

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('expenses') || '[]')
    let filtered = data

    if (filter.month) {
      filtered = data.filter(item => {
        const date = new Date(item.date)
        return date.getFullYear() == filter.year && date.getMonth() + 1 == filter.month
      })
    } else {
      filtered = data.filter(item => new Date(item.date).getFullYear() == filter.year)
    }

    const income = filtered.filter(item => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
    const expenses = filtered.filter(item => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
    
    setReportData({ income, expenses, transactions: filtered })
  }, [filter])

  const downloadPDF = () => {
    const reportContent = `Financial Report ${filter.year}${filter.month ? `-${filter.month}` : ''}
    
Total Income: $${reportData.income.toFixed(2)}
Total Expenses: $${reportData.expenses.toFixed(2)}
Net Savings: $${(reportData.income - reportData.expenses).toFixed(2)}

Transactions:
${reportData.transactions.map(t => `${t.date} - ${t.category} - ${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)} - ${t.description || ''}`).join('\n')}`

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `financial-report-${filter.year}${filter.month ? `-${filter.month}` : ''}.txt`
    a.click()
    alert('Report downloaded as text file!')
  }

  const downloadExcel = () => {
    let csv = 'Date,Type,Category,Description,Amount\n'
    reportData.transactions.forEach(t => {
      csv += `${t.date},${t.type},${t.category},"${t.description || ''}",${t.amount}\n`
    })
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `financial-report-${filter.year}${filter.month ? `-${filter.month}` : ''}.csv`
    a.click()
    alert('Report downloaded as CSV file!')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)', padding: '2rem' }}>
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>Financial Reports</h1>
      
      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
        <select
          value={filter.year}
          onChange={(e) => setFilter({ ...filter, year: e.target.value })}
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          {[2024, 2023, 2022, 2021].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={filter.month}
          onChange={(e) => setFilter({ ...filter, month: e.target.value })}
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <button onClick={downloadPDF} style={{ padding: '0.5rem 1rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Download PDF
          </button>
          <button onClick={downloadExcel} style={{ padding: '0.5rem 1rem', background: '#16a34a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Download Excel
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>Total Income</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${reportData.income.toFixed(2)}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Total Expenses</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${reportData.expenses.toFixed(2)}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ color: reportData.income - reportData.expenses >= 0 ? '#22c55e' : '#ef4444', marginBottom: '0.5rem' }}>Net Savings</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${(reportData.income - reportData.expenses).toFixed(2)}</p>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '12px', overflow: 'hidden', backdropFilter: 'blur(10px)' }}>
        <h3 style={{ padding: '1rem', backgroundColor: '#f3f4f6', margin: 0 }}>Transaction Details</h3>
        {reportData.transactions.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            No transactions found for the selected period.
          </div>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {reportData.transactions.map((transaction, index) => (
              <div key={index} style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{transaction.category}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{transaction.description}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{new Date(transaction.date).toLocaleDateString()}</div>
                </div>
                <div style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold',
                  color: transaction.type === 'income' ? '#22c55e' : '#ef4444'
                }}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reports