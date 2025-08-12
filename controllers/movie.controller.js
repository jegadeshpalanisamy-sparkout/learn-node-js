const getMovies = (req, res) => {
    res.send('Hello from movie route!');
}

const createMovie = (req, res) => {
    console.log(req.body);
    res.send('<h1>Product saved!</h1>');
}

const updateMovie = (req, res) => {
    console.log(req.body);
    res.send('<h1>Product updated!</h1>');
}

function  deleteMovie  (req, res)  {
    console.log(req.body);
    res.send('<h1>Product deleted!</h1>');
}

module.exports = {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie
}