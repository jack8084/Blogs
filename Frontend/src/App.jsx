import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Addblog from './pages/admin/Addblog'
import Liistblog from './pages/admin/Liistblog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/login'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { Useappcontext } from '../context/Appcontext'

const App = () => {

  const { token } = Useappcontext()

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/admin' element={token ? <Layout/> : <Login/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='addblog' element={<Addblog/>}/>
            <Route path='listblog' element={<Liistblog/>}/>
            <Route path='comments' element={<Comments/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App