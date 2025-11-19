import express from 'express';
import { addblog, addcomment, deleteblogbyid, generatecontent, getallblogs, getblogbyid, getblogcomments, togglepublish } from '../controllers/blogcontroller.js';
import upload from '../middlewares/multer.js';
import auth from '../middlewares/auth.js';

const blogrouter = express.Router();

blogrouter.post("/add", upload.single('image'),auth, addblog)
blogrouter.get('/all', getallblogs);
blogrouter.get('/:blogId', getblogbyid);
blogrouter.post('/delete', auth, deleteblogbyid);
blogrouter.post('/toggle-publish', auth, togglepublish);

blogrouter.post('/add-comment', addcomment);
blogrouter.post('/comments', getblogcomments)

blogrouter.post('/generate', auth, generatecontent);

export default blogrouter;