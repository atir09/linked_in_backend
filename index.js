const express=require("express")
require("dotenv").config()
const {connection}=require("./db")
const {userRoute}=require("./routes/user.route")
const {postRoute}=require("./routes/post.router")
const{authenticate}=require("./middlewares/authenticate")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRoute)

app.use("/posts",postRoute)


app.get("/",(req,res)=>{
    res.send("Home Page")
})






app.listen(process.env.port,async()=>{
    console.log("Server is On")
    try {
        await connection
        console.log("Successfully connected to DB")
    } catch (error) {
        console.log(error)
    }
})