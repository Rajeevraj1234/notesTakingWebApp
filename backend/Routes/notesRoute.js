const express = require('express');
const router = express.Router();
const User = require("../Schema/userSchema");
const Notes = require("../Schema/notesSchema");
const {authMiddleware}  = require("../Middleware/auth");


//Create
router.post("/createNote",authMiddleware,async(req,res)=>{
    if(!req.body.title || !req.body.description || !req.body.visibility ){
        res.status(400).json({
            message:"Provide all detail"
        })
    }
    const note = await Notes.create({
        title:req.body.title,
        description:req.body.description,
        visibility:req.body.visibility,
    })
    const data = await User.updateOne({_id:req.userDetail.userId},{
        $push:{
            notesRef:req.userDetail.userId
        }
    })
    console.log(data);
    res.json({note});
})



module.exports = router;