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
    runQueryExample();
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

    // const usersData = [
    //   { name: 'John',  email: 'john@test.com',  password: '123' },
    //   { name: 'Alice', email: 'alice@test.com', password: '122' },
    //   { name: 'Bob',   email: 'bob@test.com',   password: '124' },
    //   { name: 'David', email: 'david@test.com', password: '126' },
    // ];

    // await User.insertMany(usersData);
    // console.log('Multiple users inserted');
    // Find all users
    // const users = await User.find();
    // console.log('All users:', users ,'total users:', users.length);

    // const oneUser = await User.findOne({ name: 'Alice' });
    // console.log(oneUser);

    // const findByIdUser = await User.findById('69f0e41077a25da4ffee8e18');
    // console.log(findByIdUser);

    // const users = await User.find().select('name email - _id -password');
    // console.log(users);

    // // Only first 2 users.
    // const usersLimit = await User.find().limit(2);

    // //Skip first 2, get next 2.
    // const usersSkip = await User.find().skip(2).limit(2);

    //   console.log('Users with limit:', usersLimit);
    //   console.log('Users with skip:', usersSkip);



    // // Queries
    // console.log('All:', await User.find());
    // console.log('FindOne:', await User.findOne({ name: 'Alice' }));    
    // console.log('Select:', await User.find().select('name email'));
    // console.log('Sorted:', await User.find().sort({ name: -1 }));
    // console.log('Pagination:', await User.find().skip(1).limit(2));


    //delete logics
    const deleteUser = await User.deleteOne({ name: 'Bob' });
    console.log('Delete result:', deleteUser);

    const deleteById = await User.findByIdAndDelete('69f0e41077a25da4ffee8e18');
    console.log('Delete by ID result:', deleteById);


    //update logics
    const updateUser = await User.updateOne({ name: 'Alice' }, { $set: { email: 'alice2@test.com' } });
    console.log('Update result:', updateUser);

    const updateById = await User.findByIdAndUpdate('69f0e41077a25da4ffee8e18', { $set: { email:'alice3@test.com' } });
    console.log('Update by ID result:', updateById);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {   
     mongoose.connection.close();
  }
}

