const express=require("express")
const mongoose=require("mongoose")
const {postModel}=require("../model/postModel")
const {authenticate}=require("../middlewares/authenticate")

const postRoute=express.Router()

postRoute.get("/:token",authenticate,async(req,res)=>{
    const user=JSON.parse(localStorage.getItem("user"))
    const id=user["_id"]
    if(req.query?.device){
        const post=await postModel.find({userId:id,device:req.query.device})
    }else{
        const post=await postModel.find({userId:id})
    }
})

postRoute.post("/create",async(req,res)=>{
    const {title,body,device,no_of_comments,userId}=req.body
    try {
        const post=new postModel(title,body,device,no_of_comments,userId)
        post.save()
        res.send("Post Uploaded Successfully")
    } catch (error) {
        console.log(error)
        res.send("There Was An Error")
    }
})

postRoute.get("/top",async(req,res)=>{
    const user=JSON.parse(localStorage.getItem("user"))
    const id=user["_id"]
    if(req.query?.device){
        try {
            const post=await postModel.find({userId:id,device:req.query.device}).sort({"no_of_comments":-1})
            res.send(post)
        } catch (error) {
            console.log(error)
            res.send("There Was An Error")
        }
    }else{
        try {
            const post=await postModel.find({userId:id}).sort({"no_of_comments":-1})
            res.send(post)
        } catch (error) {
            console.log(error)
            res.send("There Was An Error")
        }
    }
    
})

postRoute.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const data=req.body
    try {
        await postModel.findByIdAndUpdate(id,data)
        res.send("Updated Succesfully")
    } catch (error) {
        console.log(error)
        res.send("There was An Error")
    }
})

postRoute.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try {
        await postModel.findByIdAndDelete(id)
        res.send("Deleted Succesfully")
    } catch (error) {
        console.log(error)
        res.send("There was An Error")
    }
})

module.exports={
    postRoute
}