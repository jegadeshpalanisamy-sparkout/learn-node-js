
//learn middleware
const http = require('http');
const express = require('express');
const router = require('./routes/sample.route')
const moviesRouter = require('./routes/movie.route')


const app = express();

//using body parser to get payload
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());
app.use(express.urlencoded({ extended: true }));

app.use('/admin',router);
app.use(express.static('public'));
//handle 404 page
// app.use((req, res, next) => {
//     res.status(404).send('<h1>404 page not found</h1>');
// });



app.use('/movies',moviesRouter );

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



