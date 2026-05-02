import { Book } from "../models/book.js";

const getBooks = async(req, res) => {
    try {
        const books = await Book.find();
        if(books.length === 0) {
            return res.status(200).json({ 
                success: true,
                message: 'No books found', 
                data: [] 
            });
        } else {
            return res.status(200).json({ 
                success: true,
                message: 'Books retrieved', 
                data: books 
            });
        }
    } catch (err) {
        console.error('Error retrieving books:', err.message);
        return res.status(500).json({ error: 'Failed to retrieve books' });
    }
  
};


const getBookById = async(req, res) => {
   try {
         const { id } = req.params;
         const book = await Book.findById(id);
         if (book) {
             return res.status(200).json({ 
                 success: true,
                 message: 'Book retrieved', 
                 data: book 
             });
         }
         return res.status(404).json({ error: 'Book not found' });

   } catch(err) {
       console.error('Error retrieving book:', err.message);
       return res.status(500).json({ error: 'Failed to retrieve book' });
   }
}

const createBook = async(req,res) => {
    try {
        console.log(req.body);
        const bookDetail = req.body;
        const newBook = await Book.create(bookDetail);
        if (newBook) {
            return res.status(201).json({ 
                success: true,
                message: 'Book created', 
                data: newBook 
            });
        }
        return res.status(400).json({ error: 'Failed to create book' });
    } catch (err) {
        console.error('Error creating book:', err.message);
        if (err?.name === 'StrictModeError') {
            return res.status(400).json({ error: err.message });
        }
        if (err?.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Failed to create book' });
    }
       
}


const updateBook = async(req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (updatedBook) {
            return res.status(200).json({ 
                success: true,
                message: 'Book updated', 
                data: updatedBook 
            });
        }
        return res.status(404).json({ error: 'Book not found' });
    } catch (err) {
        console.error('Error updating book:', err.message);
        if (err?.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Failed to update book' });
    }
   
}


const deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (deletedBook) {
            return res.status(200).json({ 
                success: true,
                message: 'Book deleted', 
                data: deletedBook 
            });
        }
        return res.status(404).json({ error: 'Book not found' });
    } catch (err) {
        console.error('Error deleting book:', err.message);
        return res.status(500).json({ error: 'Failed to delete book' });
    }
   
}

export { getBooks, getBookById, createBook, updateBook, deleteBook };
