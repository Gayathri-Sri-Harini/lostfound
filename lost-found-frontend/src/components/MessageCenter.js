import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/messageCenter.css';

function MessageCenter() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ receiverId: '', itemId: '', content: '' });
  const senderId = localStorage.getItem('userId');

  const fetchAllMessages = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages/all`);
      setMessages(res.data);
    } catch (err) {
      console.error('Fetch error:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchAllMessages();
    const interval = setInterval(fetchAllMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!form.receiverId || !form.itemId || !form.content.trim()) return;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/messages/send`, {
        ...form,
        senderId
      });
      setForm({ ...form, content: '' });
      fetchAllMessages();
    } catch (err) {
      console.error('Send error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="message-center">
      <h2>📥 Messages</h2>

      <form className="message-form" onSubmit={sendMessage}>
        <input
          placeholder="Receiver ID"
          value={form.receiverId}
          onChange={e => setForm({ ...form, receiverId: e.target.value })}
        />
        <input
          placeholder="Item ID"
          value={form.itemId}
          onChange={e => setForm({ ...form, itemId: e.target.value })}
        />
        <textarea
          placeholder="Type your message..."
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        />
        <button type="submit">Send</button>
      </form>

      <div className="chat-thread">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map(msg => {
            const senderLabel = msg.senderId?.username || 'User';
            const isSender = msg.senderId === senderId;
            return (
              <div key={msg._id} className={`chat-bubble ${isSender ? 'sender' : 'receiver'}`}>
                <div className="avatar">{senderLabel.charAt(0).toUpperCase()}</div>
                <div className="bubble-content">
                  <p>{msg.content}</p>
                  <span className="meta">
                    {senderLabel} • {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MessageCenter;