import { useState } from 'react';
import axios from 'axios';
import '../styles/App.css';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required');
      return;
    }

    try {
      console.log('Sending signup data:', form);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, form);
      console.log('Signup response:', res.data);
      alert('Signup successful');
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        name="name"
        placeholder="Name"
        autoComplete="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;