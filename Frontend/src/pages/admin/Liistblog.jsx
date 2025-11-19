import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import Blogtableitem from '../../components/admin/Blogtableitem';
import { Useappcontext } from '../../../context/Appcontext';
import toast from 'react-hot-toast';

const Liistblog = () => {

  const [blog, setblog] = useState([]);
  const {axios} = Useappcontext()

  const fetchblogs = async () => {
    try {
      const {data} = await axios.get('/api/admin/blogs')
    if (data.success) {
      setblog(data.blogs)
    } else {
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchblogs()
  },[])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1>All blogs</h1>
      <div className="relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blog.map((blog, index) => {
                return (
                  <Blogtableitem
                    key={blog._id}
                    blog={blog}
                    fetchblogs={fetchblogs}
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Liistblog