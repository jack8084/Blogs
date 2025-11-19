import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import Commenttableitem from '../../components/admin/Commenttableitem'
import toast from 'react-hot-toast';
import { Useappcontext } from '../../../context/Appcontext';

const Comments = () => {

  const [comments, setcomments] = useState([])
  const [filter, setfilter] = useState('Not Approved')

  const {axios} = Useappcontext()

  const fetchcomments = async()=>{
    try {
      const {data} = await axios.get('/api/admin/comments')
      data.success ? setcomments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchcomments()
  },[])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comments</h1>
        <div className='flex gap-4'>
          <button onClick={()=> setfilter('Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary' : 'text-gray-700'}`}>Approved</button>

          <button onClick={()=> setfilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'}`}>Not Approved</button>
        </div>
      </div>
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-3'> Blog Title & Comment </th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'> Date </th>
              <th scope='col' className='px-6 py-3'> Action </th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment)=>{
              if(filter === "Approved") return comment.isApproved === true;
              return comment.isApproved === false;
            }).map((comment, index)=> <Commenttableitem key={comment._id} comment={comment} index={index + 1} fetchcomments={fetchcomments}/>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments