import React from 'react'
import { assets } from '../../assets/assets';
import { Useappcontext } from '../../../context/Appcontext';
import toast from 'react-hot-toast';

const Blogtableitem = ({blog, fetchblogs, index}) => {

    const {title, createdAt} = blog;
    const blogdate = new Date(createdAt)

    const {axios} = Useappcontext();

    const deleteblog = async ()=>{
      const confirm = window.confirm('Are you sure you want to delete this blog')
      if(!confirm) return;
      try {
        const {data} = await axios.post('/api/blog/delete', {id: blog._id})
        if (data.success) {
          toast.success(data.message)
          await fetchblogs()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const togglepublish = async ()=>{
      try {
        const {data} = await axios.post('/api/blog/toggle-publish', {id: blog._id})
        if (data.success) {
          toast.success(data.message)
          await fetchblogs()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <tr className='border-y border-gray-300'>
        <th className='px-2 py-4'>{ index }</th>
        <td className='px-2 py-4'>{ title }</td>
        <td className='px-2 py-4 max-sm:hidden'>{blogdate.toDateString()}</td>
        <td className='px-2 py-4 max-sm:hidden'>
            <p className={`${blog.ispublished ? "text-green-600" : "text-orange-700"}`}>{blog.ispublished ? 'Published' : 'Unpublished'}</p>
        </td>
        <td className='px-2 py-4 flex text-xs gap-3'>
            <button onClick={togglepublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.ispublished ? 'Unpublish' : 'Publish'}</button>
            <img src={assets.cross_icon} alt="" className='w-8 hover:scale-110 transition-all cursor-pointer' onClick={deleteblog}/>
        </td>
    </tr>
  )
}

export default Blogtableitem