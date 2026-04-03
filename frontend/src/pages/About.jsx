import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
  const [student, setStudent] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/api/student`)
      .then(res => setStudent(res.data))
      .catch(err => console.error(err));
  }, [API_URL]);

  if (!student) return <div>Đang tải thông tin...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Thông tin cá nhân</h1>
      <p><strong>Họ tên:</strong> {student.name}</p>
      <p><strong>MSSV:</strong> {student.student_id}</p>
      <p><strong>Lớp:</strong> {student.class}</p>
      <p><strong>Tên ứng dụng:</strong> {student.appName}</p>
    </div>
  );
};

export default About;
