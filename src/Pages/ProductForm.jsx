import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from '@clerk/clerk-react';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    manufacturingCompany: '',
    quantity: '',
    description: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const { user } = useUser();
  const productWithUserId = {
    ...product,
    userName: user.fullName, // Add user ID to the product details
  };
  console.log(user.fullName);
  console.log(productWithUserId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://server-zxi0.onrender.com/api/products', productWithUserId);
      alert('Product submitted successfully!');
      setProduct({ name: '', manufacturingCompany: '', quantity: '', description: '', category: '' });
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Failed to submit product.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Enter your products...</h2>
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-12">
          <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow-sm">
            <div className="mb-3 row">
              <label htmlFor="name" className="col-sm-4 col-form-label">Product Name:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="manufacturingCompany" className="col-sm-4 col-form-label">Manufacturing Company:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="manufacturingCompany"
                  name="manufacturingCompany"
                  className="form-control"
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={product.manufacturingCompany}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="category" className="col-sm-4 col-form-label">Category:</label>
              <div className="col-sm-8">
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={product.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="quantity" className="col-sm-4 col-form-label">Quantity:</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="form-control"
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={product.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="description" className="col-sm-4 col-form-label">Description:</label>
              <div className="col-sm-8">
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={product.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
