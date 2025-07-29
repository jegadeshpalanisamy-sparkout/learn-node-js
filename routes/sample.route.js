
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from sample route!');
});

router.get('/get-payloads-using-body-parser',(req,res,next)=>{
    res.send('<form action="/upload-name" method="POST"><input type="text" name="name"><button type="submit">Send</button></form>');
})

router.post('/upload-name', (req, res, next) => {
    console.log('middleware 4');
    console.log(req.body);
    res.send('<h1>Hello from second-page!</h1>');
});



module.exports = router;