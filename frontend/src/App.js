import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import VideoBackground from './components/VideoBackground';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddExpense from './pages/AddExpense';
import ExpenseList from './pages/ExpenseList';
import AddIncome from './pages/AddIncome';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import About from './pages/About';
import Logout from './pages/Logout';
import Navbar from './components/Navbar';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) return <div className="glass-panel" style={{ margin: 'auto', width: 'fit-content', marginTop: '20%' }}>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <VideoBackground />
        <div className="app-container">
          {user && <Navbar />}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/transactions" element={user ? <Transactions /> : <Navigate to="/login" />} />
            <Route path="/add-expense" element={user ? <AddExpense /> : <Navigate to="/login" />} />
            <Route path="/expense-list" element={user ? <ExpenseList /> : <Navigate to="/login" />} />
            <Route path="/add-income" element={user ? <AddIncome /> : <Navigate to="/login" />} />
            <Route path="/budgets" element={user ? <Budgets /> : <Navigate to="/login" />} />
            <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/login" />} />
            <Route path="/logout" element={user ? <Logout /> : <Navigate to="/login" />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;