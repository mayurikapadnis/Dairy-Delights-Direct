import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/userRoutes.js';
// import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Optional: health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
