import express from 'express'
import { adminlogin, approvecommentbtid, deletecommentbtid, getallblogsadmin, getallcomments, getdashboard } from '../controllers/admincontroller.js';
import auth from '../middlewares/auth.js';

const adminrouter = express.Router();

adminrouter.post("/login", adminlogin);
adminrouter.get('/comments', auth, getallcomments);
adminrouter.get('/blogs', auth, getallblogsadmin);
adminrouter.post('/delete-comment', auth, deletecommentbtid);
adminrouter.post('/approve-comment', auth, approvecommentbtid)
adminrouter.get('/dashboard', auth, getdashboard)


export default adminrouter;