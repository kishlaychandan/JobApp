import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDatabse from './Config/connectToDatabase.js'
import routes from './Routes/jobsRoute.js'
dotenv.config();

const app=express();
const port=process.env.PORT||3004;
app.use(cors());
app.use(express.json())
connectToDatabse();
 app.use('/',routes)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
