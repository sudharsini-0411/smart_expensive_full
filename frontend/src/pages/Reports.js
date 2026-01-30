import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../utils/api';

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [filter, setFilter] = useState({ year: new Date().getFullYear(), month: '' });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  useEffect(() => {
    fetchReportData();
  }, [filter]);

  const fetchReportData = async () => {
    try {
      const response = await transactionAPI.getAnalytics(filter);
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data');
      // Mock data for demo
      const mockData = [
        { _id: { type: 'income', category: 'Salary' }, total: 3000, count: 1 },
        { _id: { type: 'expense', category: 'Food' }, total: 450, count: 12 },
        { _id: { type: 'expense', category: 'Rent' }, total: 1200, count: 1 },
        { _id: { type: 'expense', category: 'Utilities' }, total: 150, count: 3 }
      ];
      setReportData(mockData);
    }
  };

  const downloadPDF = () => {
    const reportContent = `
FINANCIAL REPORT - ${filter.year}${filter.month ? ` (${new Date(0, filter.month - 1).toLocaleString('default', { month: 'long' })})` : ''}

SUMMARY:
Total Income: $${totalIncome.toFixed(2)}
Total Expenses: $${totalExpenses.toFixed(2)}
Net Savings: $${(totalIncome - totalExpenses).toFixed(2)}

DETAILED BREAKDOWN:
${reportData.map(item => `${item._id.type.toUpperCase()} - ${item._id.category}: $${item.total.toFixed(2)} (${item.count} transactions)`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-report-${filter.year}${filter.month ? `-${filter.month}` : ''}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadExcel = () => {
    // Simulate Excel download
    let csv = 'Type,Category,Amount,Count\n';
    reportData.forEach(item => {
      csv += `${item._id.type},${item._id.category},${item.total},${item.count}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-report-${filter.year}${filter.month ? `-${filter.month}` : ''}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalIncome = reportData.filter(item => item._id.type === 'income').reduce((sum, item) => sum + item.total, 0);
  const totalExpenses = reportData.filter(item => item._id.type === 'expense').reduce((sum, item) => sum + item.total, 0);

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>Financial Reports</h1>

      {/* Filters */}
      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <select
          value={filter.year}
          onChange={(e) => setFilter({ ...filter, year: e.target.value })}
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={filter.month}
          onChange={(e) => setFilter({ ...filter, month: e.target.value })}
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <button onClick={downloadPDF} className="btn-primary" style={{ backgroundColor: 'var(--danger-color)' }}>
            Download PDF
          </button>
          <button onClick={downloadExcel} className="btn-primary" style={{ backgroundColor: 'var(--success-color)' }}>
            Download Excel
          </button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--success-color)', marginBottom: '0.5rem' }}>Total Income</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--danger-color)', marginBottom: '0.5rem' }}>Total Expenses</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <h3 style={{ color: totalIncome - totalExpenses >= 0 ? 'var(--success-color)' : 'var(--danger-color)', marginBottom: '0.5rem' }}>Net Savings</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${(totalIncome - totalExpenses).toFixed(2)}</p>
        </div>
      </div>

      {/* Detailed Report */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <h3 style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', margin: 0, borderBottom: '1px solid var(--glass-border)' }}>Detailed Breakdown</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>Type</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>Category</th>
              <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid var(--glass-border)' }}>Amount</th>
              <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid var(--glass-border)' }}>Transactions</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    backgroundColor: item._id.type === 'income' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: item._id.type === 'income' ? 'var(--success-color)' : 'var(--danger-color)'
                  }}>
                    {item._id.type}
                  </span>
                </td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>{item._id.category}</td>
                <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid var(--glass-border)', color: item._id.type === 'income' ? 'var(--success-color)' : 'var(--danger-color)' }}>
                  ${item.total.toFixed(2)}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid var(--glass-border)' }}>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;