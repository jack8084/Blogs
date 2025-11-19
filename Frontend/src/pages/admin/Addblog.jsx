import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { Useappcontext } from '../../../context/Appcontext'
import toast from 'react-hot-toast';
import {parse} from 'marked'

const Addblog = () => {

  const {axios} = Useappcontext()
  const [isadding, setisadding] = useState(false)
  const [isloading, setisloading] = useState(false)

  const editorref = useRef(null)
  const quillRef = useRef(null)

  const [image, setimage] = useState(false);
  const [title, settitle] = useState('');
  const [subtitle, setsubtitle] = useState('');
  const [category, setcategory] = useState('Startup');
  const [ispublished, setispublished] = useState(false);

  const generatecontent = async ()=>{
    if(!title) return toast.error('Please enter a title')
      try {
        setisloading(true);
        const {data} = await axios.post('/api/blog/generate', {prompt: title})
        if(data.success){
          quillRef.current.root.innerHTML = parse(data.content)
        } else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }finally{
        setisloading(false)
      }
  }

  const onsubmithandler = async (e) =>{
    try {
      e.preventDefault();
      setisadding(true)

      const blog = { title, subtitle, description: quillRef.current.root.innerHTML, category, ispublished }

      const formdata = new FormData();
      formdata.append('blog', JSON.stringify(blog))
      formdata.append('image', image)

      const {data} = await axios.post('/api/blog/add', formdata);

      if (data.success) {
        toast.success(data.message);
        setimage(false)
        settitle('')
        quillRef.current.root.innerHTML = ''
        setcategory('startup')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setisadding(false)
    }
  }

  useEffect(()=>{
    if(!quillRef.current && editorref.current){
      quillRef.current = new Quill(editorref.current, {theme: 'snow'})
    }
  },[])


  return (
    <form onSubmit={onsubmithandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer'/>
          <input onChange={(e)=> setimage(e.target.files[0])} type="file" id='image' hidden required/>
        </label>
        <p className='mt-4'>Blog Title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e=> settitle(e.target.value)} value={title}/>
        <p className='mt-4'>Sub Title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e=> setsubtitle(e.target.value)} value={subtitle}/>
        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorref}></div>
          <button type='button' disabled={isloading} onClick={generatecontent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>{isloading ? 'Loading...' : 'Generate with AI'}</button>
        </div>

          <p className='mt-4'>Blog category</p>
          <select onChange={e=> setcategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
            <option value="">Select Category</option>
            {blogCategories.map((item,index)=>{
              return <option Key={index} value={item}>{item}</option>
            })}
          </select>  
          <div className='flex gap-2 mt-4'>
            <p>
              Publish Now
            </p>
            <input type="checkbox" checked={ispublished} className='scale-125 cursor-pointer' onChange={e => setispublished(e.target.checked)}/>
          </div>
          <button disabled={isadding} type='submit' className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>{isadding ? 'Adding...' : 'Add Blog'}</button>
      </div>
    </form>
  )
}

export default Addblog