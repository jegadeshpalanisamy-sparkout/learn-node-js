const book = [
    {
        id: 1,
        name: 'book 1'
    },
    {
        id: 2,
        name: 'book 2'
    }
]

const getBooks = (req, res) => {
    console.log('**************',req);
    res.status(200).json({ message: 'Hello from book route!', books: book });
};


const getBookById = (req, res) => {
    const { id } = req.params;
    const bookId = Number(id);

    if (Number.isNaN(bookId)) {
        return res.status(400).json({ error: 'Invalid book id' });
    }

    const book = book.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    return res.status(200).json({ message: 'Book found', book });
}

const createBook = (req,res) => {
    console.log(req.body);
    const bookDetail = req.body;
    if(!bookDetail.name){
     return res.status(400).json({ error: 'Book name is required' });
    }
    bookDetail.id = book.length + 1;
    console.log(book);
    book.push(bookDetail);
    res.status(201).json({ message: 'Book created', book });    
}


const updateBook = (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const bookId = Number(id);
    if (Number.isNaN(bookId)) {
        return res.status(400).json({ error: 'Invalid book id' });
    }

    const bookIndex = book.findIndex(b => b.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const updatedBook = { ...book[bookIndex], ...updates, updatedAt: new Date().toISOString() };
    book[bookIndex] = updates;

    return res.status(200).json({ message: 'Book updated', book: updatedBook });
}


const deleteBook = (req, res) => {
    const { id } = req.params;

    const bookId = Number(id);
    if (Number.isNaN(bookId)) {
        return res.status(400).json({ error: 'Invalid book id' });
    }

    const bookIndex = book.findIndex(b => b.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    book.splice(bookIndex, 1);
    return res.status(200).json({ message: 'Book deleted', id: bookId });
}

export { getBooks, getBookById, createBook, updateBook, deleteBook };
