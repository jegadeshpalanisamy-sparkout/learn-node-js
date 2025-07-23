
//learn middleware
const http = require('http');
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('middleware 1');
    next();
});

app.use((req, res, next) => {
    console.log('middleware 2');
    next();
});

app.use((req, res, next) => {
    console.log('middleware 3');
});

const server = http.createServer(app);
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
