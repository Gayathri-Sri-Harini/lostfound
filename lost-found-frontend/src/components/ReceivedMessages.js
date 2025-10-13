import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/messageCenter.css';

function ReceivedMessages() {
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchReceived = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages/received`, {
          params: { userId }
        });
        setMessages(res.data);
      } catch (err) {
        console.error('Fetch error:', err.response?.data || err.message);
      }
    };

    fetchReceived();
  }, [userId]);

  return (
    <div className="message-center">
      <h2>📥 Messages Received</h2>
      <div className="chat-thread">
        {messages.length === 0 ? (
          <p>No messages received yet.</p>
        ) : (
          messages.map(msg => (
            <div key={msg._id} className="chat-bubble receiver">
              <div className="avatar">{msg.senderId.username?.charAt(0)}</div>
              <div className="bubble-content">
                <p>{msg.content}</p>
                <span className="meta">
                  From {msg.senderId.username} • {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReceivedMessages;