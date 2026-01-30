import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddExpense from './pages/AddExpense'
import ExpenseList from './pages/ExpenseList'
import AddIncome from './pages/AddIncome'
import Budget from './pages/Budget'
import Reports from './pages/Reports'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import About from './pages/About'
import Logout from './pages/Logout'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App" style={{ minHeight: '100vh', width: '100vw' }}>
        <nav style={{ 
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)', 
          padding: '1rem 2rem', 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%'
        }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Home</Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Login</Link>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Register</Link>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Dashboard</Link>
          <Link to="/add-expense" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Add Expense</Link>
          <Link to="/expenses" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Expenses</Link>
          <Link to="/add-income" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Add Income</Link>
          <Link to="/budget" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Budget</Link>
          <Link to="/reports" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Reports</Link>
          <Link to="/notifications" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Alerts</Link>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Profile</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>About</Link>
          <Link to="/logout" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Logout</Link>
        </nav>
        
        <div style={{ width: '100%', minHeight: 'calc(100vh - 60px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/expenses" element={<ExpenseList />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App