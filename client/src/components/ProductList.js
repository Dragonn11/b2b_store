import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
import ProductModal from './ProductModal';
import API_URL from '../config';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    const result = await axios.get(`${API_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setProducts(result.data);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSearchById = async () => {
    if (searchId) {
      try {
        const response = await axios.get(`${API_URL}/api/products/${searchId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProducts([response.data]);
      } catch (err) {
        console.error('Error fetching product by ID', err);
        setProducts([]);
      }
    } else {
      fetchAllProducts();
    }
  };

  const handleSearchByName = async () => {
    if (searchName) {
      try {
        const response = await axios.get(`${API_URL}/api/products/filter?name=${searchName}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products by name', err);
        setProducts([]);
      }
    } else {
      fetchAllProducts();
    }
  };

  const handleProductAdded = () => {
    fetchAllProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div className="header">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="search-container">
        <div className="search-by-id">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Search by ID"
          />
          <button onClick={handleSearchById}>Search</button>
        </div>
        <div className="search-by-name">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by Name"
          />
          <button onClick={handleSearchByName}>Search</button>
        </div>
        <button className="add-product-button" onClick={() => setIsModalOpen(true)}>Add Product</button>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>Category: {product.data_category}</p>
            <p>Record Count: {product.record_count}</p>
            {product.company_name && <p>Company: {product.company_name}</p>}
            {product.company_address && <p>Address: {product.company_address}</p>}
            {product.website && <p>Website: <a href={product.website}>{product.website}</a></p>}
          </div>
        ))}
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
};

export default ProductList;
