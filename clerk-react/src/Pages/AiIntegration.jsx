import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AIIntegration = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the description to the Flask API for categorization
      const response = await axios.post('https://server-zxi0.onrender.com/api/categorize', {
        description,
      });

      // Update the state with the predicted category
      setCategory(response.data.category);
    } catch (error) {
      console.error('Error categorizing description:', error);
      setCategory('Error occurred while categorizing.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">AI Integration for Expense Categorization</h2>
      <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Transaction Description</label>
          <textarea
            id="description"
            className="form-control"
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter transaction description here..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Categorize</button>
      </form>
      {category && (
        <div className="mt-4">
          <h4>Predicted Category:</h4>
          <p>{category}</p>
        </div>
      )}
    </div>
  );
};

export default AIIntegration;