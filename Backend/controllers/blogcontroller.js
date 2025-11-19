import fs from 'fs'
import imagekit from '../configs/iamgekit.js';
import Blog from '../models/blog.js';
import comment from '../models/comments.js';
import main from '../configs/gemini.js';

export const addblog = async (req, res)=>{
    try {
        const {title, subtitle, description, category, ispublished} = JSON.parse(req.body.blog);
        const imagefile = req.file;

        //chck if all feilds are present
        if(!title || !description || !category || !imagefile){
            return res.json({success: false, message: "Missing required fields"})
        }

        const filebuffer = fs.readFileSync(imagefile.path)

        // Upload image to imagekit
        const response = await imagekit.upload({
            file: filebuffer,
            fileName: imagefile.originalname,
            folder: "/blogs"
        })

        //Optimisation through imagekit url transformation
        const optimizedimageurl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, //auto compression
                {format: 'webp'}, //convert to mordern format
                {width: '1280'} //width resizing
            ]
        })

        const image = optimizedimageurl;

        await Blog.create({title, subtitle, description, category, image, ispublished})

        res.json({success: true, message: "Blog added Successfully"})

    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

export const getallblogs = async (req, res)=>{
    try {
        const blogs = await Blog.find({ispublished: true})
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

export const getblogbyid = async (req, res) =>{
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({ success: false, message: "Blog not found"})
        }
        res.json({success: true, blog})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

export const deleteblogbyid = async (req, res) =>{
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);

        //delete all comments associated with the blog
        await comment.deleteMany({blog: id});

        res.json({success: true, message: 'blog deleted successfully'})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

export const togglepublish = async (req, res) =>{
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.ispublished = !blog.ispublished;
        await blog.save();
        res.json({success: true, message: 'Blog status updated'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export const addcomment = async (req, res) =>{
    try {
        const {blog, name, content} = req.body;
        await comment.create({blog, name, content});
        res.json({success: true, message: 'comment added for review'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getblogcomments = async (req, res) =>{
    try {
        const { blogId } = req.body;

        const comments = await comment
            .find({ blog: blogId, isApproved: true })
            .sort({ createdAt: -1 });

        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const generatecontent = async (req, res)=>{
    try {
        const {prompt} = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
        res.json({success: true, content})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
