import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        unique: true,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [50, 'Name must be at most 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        minlength: [3, 'Email must be at least 3 characters'],
        maxlength: [50, 'Email must be at most 50 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: [3, 'Password must be at least 3 characters']
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }

}, {
    timestamps: true,
    strict: 'throw'
})

export const User = mongoose.model('User', UserSchema);