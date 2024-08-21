import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Function to fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://server-zxi0.onrender.com/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  // Function to handle product deletion
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://server-zxi0.onrender.com/api/products/${productId}`);
      fetchProducts(); // Reload the product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container-fluid bg-white min-vh-100 p-4" style={{ marginTop: '70px' }}>
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 text-center">All Products</h2>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.manufacturingCompany}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>{product.description}</td>
                    <td>{product.userName}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDelete(product._id)}
                        aria-label="Delete"
                        style={{ width: '24px', height: '24px', padding: '0', fontSize: '0.75rem' }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
