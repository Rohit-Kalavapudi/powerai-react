import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhMTIyOWM3NTYwM2I5MTEzYzBmM2JiIn0sImlhdCI6MTY4ODI5OTkwMn0.ftUw39tjZJe3sjIpmnZ3ORzPDNUmmMVMA7SkQFJzwI0');
    localStorage.setItem('name', 'Anonymous');
    console.log("hello");
    navigate('/'); 
  }, [navigate]);

  return null; 
};

export default Logout;
