import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProtectedRoute component={ProductList} />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
