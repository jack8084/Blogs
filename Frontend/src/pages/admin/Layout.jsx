import React from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import Sidebar from "../../components/admin/Sidebar";
import { Useappcontext } from "../../../context/Appcontext";

const Layout = () => {

  const {axios, settoken, navigate} = Useappcontext

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    settoken(null)
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <img src={assets.logo} className="w-32 sm:w-40 cursor-pointer" alt="" onClick={()=> navigate('/')}/>
        <button onClick={logout} className="tetx-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer">Logout</button>
      </div>
      <div className="flex h-[clac(100vh-70px)]">
        <Sidebar/>
        <Outlet/>
      </div>  
    </>
  );
};

export default Layout;
