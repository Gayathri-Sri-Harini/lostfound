import { useState } from 'react';
import axios from 'axios';

function SearchItems() {
  const [query, setQuery] = useState({ keyword: '', location: '', type: '' });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/items/search`, {
        params: query
      });
      setResults(res.data);
    } catch (err) {
      console.error('Search error:', err.response?.data || err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Search Lost & Found Items</h2>
      <form onSubmit={handleSearch}>
        <input name="keyword" placeholder="Keyword" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <select name="type" onChange={handleChange}>
          <option value="">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map(item => (
          <li key={item._id}>
            <strong>{item.title}</strong> ({item.type})<br />
            {item.description}<br />
            <em>{item.location} — {new Date(item.date).toLocaleDateString()}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchItems;