
//learn middleware
const http = require('http');
const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    console.log('middleware 1');
    next();
});

app.use('/first-page', (req, res, next) => {
    console.log('middleware 2');
    res.send('<h1>Hello from first-page!</h1>');
    next();
});

app.use('/second-page', (req, res, next) => {
    console.log('middleware 3');
    res.send('<h1>Hello from second-page!</h1>');
});

// const server = http.createServer(app);
// server.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// });

app.listen(3000);
