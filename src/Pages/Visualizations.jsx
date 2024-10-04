import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Visualizations = () => {
  const [productData, setProductData] = useState([]);

  // Function to fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://server-zxi0.onrender.com/api/products'); // Update with your actual API endpoint
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  // Processing data for the "Product Count by Category" bar chart
  const categories = productData.map(product => product.category);
  const counts = categories.reduce((acc, category) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const countChartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: "Product Count by Category",
        data: Object.values(counts),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Processing data for the "Category vs. Quantity" bar chart
  const categoryQuantities = productData.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.quantity;
    return acc;
  }, {});

  const quantityChartData = {
    labels: Object.keys(categoryQuantities),
    datasets: [
      {
        label: "Quantity in Category",
        data: Object.values(categoryQuantities),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Product Visualizations</h1>
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="d-flex justify-content-between">

            <div className="card p-3 shadow-sm" style={{ flex: 1, marginRight: "20px" }}>
              <h3 className="text-center">Category Breakdown</h3>
              <div className="card-body">
                <div style={{ height: "350px" }}>
                  <Bar 
                    data={countChartData} 
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: 'Category',
                            color: '#000',
                            font: {
                              size: 16
                            }
                          }
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Count',
                            color: '#000',
                            font: {
                              size: 16
                            }
                          },
                          beginAtZero: true
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>

            <div className="card p-3 shadow-sm" style={{ flex: 1 }}>
              <h3 className="text-center">Spending Trends</h3>
              <div className="card-body">
                <div style={{ height: "350px" }}>
                  <Bar 
                    data={quantityChartData} 
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: 'Category',
                            color: '#000',
                            font: {
                              size: 16
                            }
                          }
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Quantity',
                            color: '#000',
                            font: {
                              size: 16
                            }
                          },
                          beginAtZero: true
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizations;
