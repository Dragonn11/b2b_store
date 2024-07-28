import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import './ProductModal.css';

const ProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [name, setName] = useState('');
  const [dataCategory, setDataCategory] = useState('');
  const [recordCount, setRecordCount] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        name,
        data_category: dataCategory,
        record_count: recordCount,
        company_name: companyName,
        company_address: companyAddress,
        website,
      };
      await axios.post(`${API_URL}/api/products`, newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      onProductAdded();
      onClose();
    } catch (err) {
      console.error('Error adding product', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Data Category</label>
            <input type="text" value={dataCategory} onChange={(e) => setDataCategory(e.target.value)} required />
          </div>
          <div>
            <label>Record Count</label>
            <input type="number" value={recordCount} onChange={(e) => setRecordCount(e.target.value)} required />
          </div>
          <div>
            <label>Company Name</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div>
            <label>Company Address</label>
            <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
          </div>
          <div>
            <label>Website</label>
            <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <button type="submit">Add Product</button>
        </form>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductModal;
