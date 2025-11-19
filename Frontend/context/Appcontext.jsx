import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Appcontext = createContext();

export const Appprovider = ({ children })=>{

    const navigate = useNavigate()

    const [token, settoken] = useState(null)
    const [blog, setblogs] = useState([]);
    const [input, setinput] = useState("")

    const fetchblogs = async ()=>{
        try {
            const { data } = await axios.get('/api/blog/all')
            data.success ? setblogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchblogs();
        const token = localStorage.getItem('token')
        if(token){
            settoken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    },[])

    const value = {
        axios, navigate, token, settoken, blog, setblogs, input, setinput
    }

    return (

        <Appcontext.Provider value={value}>
            {children}
        </Appcontext.Provider>
    )
};

export const Useappcontext = ()=>{
    return useContext(Appcontext)
};