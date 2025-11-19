import React from "react";
import { assets } from "../../assets/assets";
import { Useappcontext } from "../../../context/Appcontext";
import toast from 'react-hot-toast';

const Commenttableitem = ({ comment, fetchcomments }) => {
  const { blog, createdAt, _id } = comment;
  const Blogdate = new Date(createdAt);

  const {axios} = Useappcontext()

  const approvecomment = async()=>{
    try {
      const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
      if (data.success) {
        toast.success(data.message)
        fetchcomments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
}


  const deletecomment = async()=>{
    try {
      const confirm = window.confirm('Are you sure you want to delete this?');
      if(!confirm) return
      const {data} = await axios.post('/api/admin/delete-comment', {id: _id})
      if (data.success) {
        toast.success(data.message)
        fetchcomments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }    

  return (
    <tr className="order-y border-gray-300">
      <td className="px-5 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {Blogdate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
            {
                !comment.isApproved ? 
                <img onClick={approvecomment} src={assets.tick_icon} className="w-5 hover:scale-110 transition-all cursor-pointer " alt="" /> : <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">Approved</p>
            }
            <img onClick={deletecomment} src={assets.bin_icon} alt="" className="w-5 hover:scale-110 transition-all cursor-pointer"/>
        </div>
      </td>
    </tr>
  );
};

export default Commenttableitem;
