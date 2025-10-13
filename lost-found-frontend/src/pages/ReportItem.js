import { useState } from 'react';
import axios from 'axios';
import '../styles/App.css';

function ReportItem() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    type: 'lost'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/items/report`, form);
      alert('Item reported successfully');
      console.log(res.data);
    } catch (err) {
      console.error('Report error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to report item');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Report Lose or Found Item</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="title" placeholder="Item Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="lost">Lose</option>
        <option value="found">Found</option>
      </select>
      <button type="submit">Report</button>
    </form>
  );
}

export default ReportItem;