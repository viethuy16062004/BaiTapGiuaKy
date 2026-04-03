import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchMessages = () => {
    axios.get(`${API_URL}/api/messages`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    axios.post(`${API_URL}/api/messages`, { content: input })
      .then(() => {
        setInput('');
        fetchMessages();
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Trang chủ - Gửi tin nhắn</h1>
      <form onSubmit={handleSubmit}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Nhập tin nhắn..." 
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>Gửi</button>
      </form>
      <hr />
      <h3>Danh sách tin nhắn từ Database:</h3>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m.content} <small>({new Date(m.createdAt).toLocaleString()})</small></li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
