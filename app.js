
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


//using body parser to get payload
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());
app.use(express.urlencoded({ extended: true }));

app.get('/get-payloads-using-body-parser',(req,res,next)=>{
    res.send('<form action="/upload-name" method="POST"><input type="text" name="name"><button type="submit">Send</button></form>');
})

app.post('/upload-name', (req, res, next) => {
    console.log('middleware 4');
    console.log(req.body);
    res.send('<h1>Hello from second-page!</h1>');
});

app.listen(3000);
