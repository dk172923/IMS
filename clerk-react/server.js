import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config({ path: '.env.local' });

const app = express();

// CORS setup to allow requests from the frontend
app.use(cors({
  origin: 'https://zingy-licorice-959ee5.netlify.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
  name: String,
  manufacturingCompany: String,
  quantity: Number,
  description: String,
  category: String,
  userName: String,
});

const Product = mongoose.model('Product', productSchema);

// Route to create a new product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to delete a product by ID 
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
