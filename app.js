
//learn middleware
const http = require('http');
const express = require('express');
const router = require('./routes/sample.route')


const app = express();

//using body parser to get payload
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());
app.use(express.urlencoded({ extended: true }));

app.use(router);
//handle 404 page
app.use((req, res, next) => {
    res.status(404).send('<h1>404 page not found</h1>');
});

app.listen(3000);



