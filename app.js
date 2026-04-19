import express from 'express';
import mongoose from 'mongoose';
import adminRouter from './routes/sample.route.js';
import moviesRouter from './routes/movie.route.js';
import bookRouter from './routes/book.route.js';

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Global middleware:', req.method, req.url);
  next();
});

// Routes
app.use('/admin', adminRouter);
app.use('/movies', moviesRouter);
app.use('/books', bookRouter);

// 404 handler (optional)
app.use((req, res) => {
  res.status(404).send('404 page not found');
});

// ✅ Error middleware MUST be last
app.use((err, req, res, next) => {
  console.error('Error middleware:', err.message);
  res.status(500).send('Something broke!');
});

// ✅ DB connect first, then server start
const MONGO_URI =
  'mongodb+srv://learningslearn3_db_user:jP8P911TTZPirTSg@cluster0.rhd2gln.mongodb.net/learn_db';

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
