import { useEffect, useState, useCallback } from 'react';
import axiosAuth from '../utils/axiosAuth';

function Dashboard() {
  const [items, setItems] = useState([]);
  const userId = localStorage.getItem('userId');

  const fetchItems = useCallback(async () => {
    try {
      const res = await axiosAuth.get(`/items/user`, {
        params: { userId }
      });
      setItems(res.data);
    } catch (err) {
      console.error('Dashboard error:', err.response?.data || err.message);
    }
  }, [userId]);

  const markResolved = async (itemId) => {
    try {
      await axiosAuth.post('/items/resolve', { itemId });
      alert('Item marked as resolved');
      fetchItems(); // ✅ Refresh after update
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]); // ✅ ESLint warning resolved

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Your Reported Items</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item._id} style={{
            background: '#f9f9f9',
            padding: '15px',
            marginBottom: '15px',
            borderRadius: '8px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
          }}>
            <strong>{item.title}</strong> ({item.type})<br />
            {item.description}<br />
            <em>{item.location} — {new Date(item.date).toLocaleDateString()}</em><br />
            {!item.resolved && (
              <button onClick={() => markResolved(item._id)} style={{ marginTop: '10px' }}>
                Mark as Resolved
              </button>
            )}
            {item.resolved && <span style={{ color: 'green' }}>✅ Resolved</span>}
            <br />
            <a
              href={`/message?receiverId=${item.ownerId || userId}&itemId=${item._id}`}
              style={{ textDecoration: 'none' }}
            >
              <button style={{ marginTop: '10px' }}>Message Owner</button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;