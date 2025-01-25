import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from './pages/buttons.js';
import Login from './pages/login.js';
import Register from './pages/register.js';
import "./App.css"

function App() {
  return (
    <Router>
      <div>
      
        <Routes>
          <Route path="/" element={<Button />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
