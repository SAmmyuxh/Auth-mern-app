import e from "express";
import { authval } from "../Middlewares/Auth.js";
const router = e.Router();
router.get('/',authval,(req,res)=>{
    console.log("Logged in user detail",req.user)
    res.status(200).send([{
       "name":"Samruddh",
       "skill":"useless" 
    },
    {
        "name":"Samruddhss",
        "skill":"uselessssss" 
     }])
})


export default router