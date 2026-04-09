import express from 'express';
import path from 'node:path';
import rootDir from '../utils/path.js';

const router = express.Router();

const logTime = (req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log('Route middleware time:', req.requestTime);
    next();
};

const first = (req, res, next) => {
    console.log('First middleware');
    next();
};

const second = (req, res, next) => {
    console.log('Second middleware');
    next();
};

router.get('/', (req, res) => {
    // res.send('Hello from sample route!');
    res.sendFile(path.join(rootDir, 'views', 'sample.html'));
});

router.get('/get-payloads-using-body-parser',(req,res,next)=>{
    res.send('<form action="upload-name" method="POST"><input type="text" name="name"><button type="submit">Send</button></form>');
})

router.post('/upload-name', (req, res, next) => {
    console.log('middleware 4');
    console.log(req.body);
    res.send('<h1>Hello from second-page!</h1>');
});

router.get('/with-middleware', logTime, (req, res) => {
    res.send(`Hello! Time recorded: ${req.requestTime}`);
});

router.get('/chain', first, second, (req, res) => {
    res.send('Chained middleware executed!');
});

router.get('/boom', (req, res, next) => {
    next(new Error('Test error'));
});

router.get('/add-product-form', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/save-product', (req, res, next) => {
    console.log(req.body);
    res.send('<h1>Product saved!</h1>');
})



export default router;
