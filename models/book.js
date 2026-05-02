import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [100, 'Title must be at most 100 characters']
    },
    author: {
        type: String,
        required: [ true, 'Author is required'],
        trim: true,
        minlength: [3, 'Author must be at least 3 characters'],
        maxlength: [50, 'Author must be at most 50 characters']
    },
    publishedYear: {
        type: Number,
        min: [ 1450, 'Published year must be after 1450'],
        max: [ new Date().getFullYear(), 'Published year cannot be in the future']
    },
    createAt: {
        type: Date,
        default: Date.now
    }

},
{
    strict: 'throw',
    timestamps: true
})

export const Book = mongoose.model('Book', bookSchema);
