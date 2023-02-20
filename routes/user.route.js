const express=require("express")
const mongoose=require("mongoose")
const {userModel}=require("../model/userModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config()

const userRoute=express.Router()

userRoute.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body
    try {
        const presentUser=userModel.find({email})
        if(presentUser.length){
            res.send("User already exist, please login")
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    res.send(err)
                }else{
                    const user=new userModel({name,email,gender,password:hash,age,city})
                    user.save()
                    res.send("User Registered Successfully")
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.send("There was an error.")
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await userModel.find({email})
        console.log(user[0])
        if (user?.length){
            bcrypt.compare(password, user[0].password, async(err, result)=> {
                if(result){
                    var token = jwt.sign({userId:user[0]["_id"] }, process.env.jsonKey,{expiresIn: '24h' })
                    // localStorage.setItem("token",token)
                    res.send(`Login Successful,Your Token:${token}`)
                }else{
                    res.send("Invalid Credentials")
                }
            });
        }else{
            res.send("Invalid Credentials")
        }
    } catch (error) {
        console.log(error)
        res.send("There Was an error")
    }
})



module.exports= {userRoute}