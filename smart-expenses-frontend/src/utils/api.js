const API_BASE_URL = 'https://smart-expensive-2.onrender.com/api';

const api = {
  // Auth endpoints
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  // Transaction endpoints
  getTransactions: async (token) => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  createTransaction: async (token, transactionData) => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(transactionData)
    });
    return response.json();
  },

  // Budget endpoints
  getBudgets: async (token) => {
    const response = await fetch(`${API_BASE_URL}/budgets`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  createBudget: async (token, budgetData) => {
    const response = await fetch(`${API_BASE_URL}/budgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(budgetData)
    });
    return response.json();
  }
};

export default api;