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
}).catch((err) => {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
});

//Create mongoose schema 
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }

});
// Create mongoose model
const User = mongoose.model('User', userSchema);

async function runQueryExample() {
  try {
    // Create a new user
    const newUser = new User({ name: 'John Doe', email: 'test@example.com', password: 'password123' });
    await newUser.save();

    // Find all users
    const users = await User.find();
    console.log('All users:', users);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {   
     mongoose.connection.close();
  }
}

runQueryExample();