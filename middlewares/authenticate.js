const jwt=require("jsonwebtoken")
const express=require("express")
require("dotenv").config()
const {userModel}=require("../model/userModel")


function authenticate(req,res,next){
    const token=req.params.token
    // const token=localStorage.getItem(token)
    jwt.verify(token,process.env.jsonKey,async(err, decoded)=> {
            try {
                if(decoded){
                    var _id=decoded["userId"]
                    const user=await userModel.findById(_id)
                    console.log(user)
                    // localStorage.setItem("user",JSON.stringify(user))
                    next()
                }else{
                    res.send(err)
                }
            } catch (error) {
                console.log("There was an error")
                res.send("There was an error")
            }
      });
}


module.exports={authenticate}
