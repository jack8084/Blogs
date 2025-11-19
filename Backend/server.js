import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectdb from './configs/db.js';
import adminrouter from './routes/adminroutes.js';
import blogrouter from './routes/blogroutes.js';

const app = express();

await connectdb();

//Middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=> res.send("API is working"))
app.use('/api/admin', adminrouter)
app.use('/api/blog', blogrouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server is running on port' + PORT)
})

export default app;