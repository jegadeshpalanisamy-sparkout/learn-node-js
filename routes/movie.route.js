

const express = require('express');
const routes = express.Router();
routes.get('/', (req, res) => {
    res.send('Hello from movie route!');
});

routes.post('/', (req, res) => {
    console.log(req.body);
    res.send('<h1>Product saved!</h1>');
})

routes.put('/:id', (req, res) => {
    console.log(req.body);
    res.send('<h1>Product updated!</h1>');
})

routes.delete('/:id', (req, res) => {
    console.log(req.body);
    res.send('<h1>Product deleted!</h1>');
})

module.exports = routes