import e from "express";   
import 'dotenv/config' ;
import connectDB from "./DB/db.js";
import bodyParser from "body-parser";
import cors from "cors"
import Authrouter from "./Routes/AuthRouter.js";
import Productrouter from "./Routes/ProductRouter.js";
const app = e();


const PORT =process.env.PORT;
connectDB()
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',Authrouter)
app.use('/products',Productrouter)
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})

