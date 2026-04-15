
//learn middleware
import express from 'express';
import router from './routes/sample.route.js';
import moviesRouter from './routes/movie.route.js';
import { registerMovieListeners } from './listeners/movie.listeners.js';
import bookRouter from './routes/book.route.js';
const app = express();
registerMovieListeners();

// Global middleware example: runs on every request
app.use((req, res, next) => {
    console.log('Global middleware:', req.method, req.url);
    next();
});

//using body parser to get payload
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/admin',router);
app.use(express.static('public'));
//handle 404 page
// app.use((req, res, next) => {
//     res.status(404).send('<h1>404 page not found</h1>');
// });



app.use('/movies',moviesRouter );

// Error-handling middleware example
app.use((err, req, res, next) => {
    console.error('Error middleware:', err.message);
    res.status(500).send('Something broke!');
});

//book store rest apis

app.use('/books', bookRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
