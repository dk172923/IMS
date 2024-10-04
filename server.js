import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Together from 'together-ai';

dotenv.config({ path: '.env.local' });

const app = express();

// CORS setup to allow requests from the frontend
app.use(cors({
  origin: 'https://zingy-licorice-959ee5.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

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

// Function to categorize a description using Together API
const categorizeDescription = async (description) => {
  const together = new Together({ apiKey: TOGETHER_API_KEY });

  const prompt = `Categorize the following product description into an inventory management category. Give the answer as a single word or phrase only, the answer must be meaningful as well.:
  Description: "${description}"
  Category:`;

  try {
    const response = await together.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant that categorizes product descriptions.' },
        { role: 'user', content: prompt },
      ],
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
  max_tokens: 100, // Increased token limit
  temperature: 0.7,
  top_p: 0.9,
  top_k: 50,
  repetition_penalty: 1.2, // Encourages more varied output
  stream: false
    });

    const category = response.choices[0].message.content.trim();
    return category;
  } catch (error) {
    console.error('Error categorizing description:', error);
    return 'Uncategorized';
  }
};

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

// Route to categorize a product description
app.post('/api/categorize', async (req, res) => {
  try {
    const { description } = req.body;
    const category = await categorizeDescription(description);
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: 'Error categorizing description', error });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
