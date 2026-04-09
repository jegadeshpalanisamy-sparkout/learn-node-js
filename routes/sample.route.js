import express from 'express';
import path from 'node:path';
import rootDir from '../utils/path.js';

const router = express.Router();
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

router.get('/add-product-form', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/save-product', (req, res, next) => {
    console.log(req.body);
    res.send('<h1>Product saved!</h1>');
})



export default router;
