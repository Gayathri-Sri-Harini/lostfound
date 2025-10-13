import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReportItem from './pages/ReportItem';
import SearchItems from './pages/SearchItems';
import Dashboard from './pages/Dashboard';
import MessageCenter from './components/MessageCenter';
import './styles/App.css';
import ReceivedMessages from './components/ReceivedMessages';



function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#0078d4',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '30px'
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              minHeight: '100vh',
              background: 'linear-gradient(to bottom right, #eef6f9, #dbefff)',
              animation: 'fadeIn 1.2s ease-in-out'
            }}>
              <h2 style={{ fontSize: '32px', color: '#333' }}>Welcome to Lose & Found</h2>
              <p style={{ fontSize: '18px', color: '#555', marginTop: '20px', maxWidth: '700px', margin: 'auto' }}>
                Misplaced something? Found something valuable? You’re in the right place.
                <br /><br />
                Our platform helps you report lost items, share found belongings, and connect with others to bring things back where they belong.
                <br /><br />
                Every report matters. Every message helps. Let’s restore what’s missing — together.
              </p>

              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <Link to="/report">
                  <button style={buttonStyle}>Report Item</button>
                </Link>
                <Link to="/search">
                  <button style={buttonStyle}>Search Items</button>
                </Link>
              </div>

              <div style={{ marginTop: '60px', maxWidth: '700px', margin: 'auto' }}>
                <h3 style={{ color: '#0078d4' }}>What users are saying</h3>
                <blockquote style={{ fontStyle: 'italic', color: '#444', marginTop: '20px' }}>
                  “I found my missing wallet within hours thanks to this platform. It’s a lifesaver!”<br />
                  — Priya, Hyderabad
                </blockquote>
                <blockquote style={{ fontStyle: 'italic', color: '#444', marginTop: '20px' }}>
                  “Reporting a found phone was easy, and the owner was so grateful. Great experience!”<br />
                  — Arjun, Vizag
                </blockquote>
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchItems />} />
        <Route path="/report" element={isLoggedIn ? <ReportItem /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/message" element={isLoggedIn ? <MessageCenter /> : <Navigate to="/login" />} />
        <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '30px' }}>404 - Page Not Found</h2>} />
        <Route path="/inbox" element={<ReceivedMessages />} />

      </Routes>
    </Router>
  );
}

export default App;