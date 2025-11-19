import mongoose from 'mongoose';

const blogschema = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String},
    description: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    ispublished: {type: Boolean, required: true},
},{timestamps: true});

const Blog = mongoose.model('blog', blogschema)

export default Blog;