const comments = require("../Models/CommentSchema");
const tryCatch = require("../Utils/tryCatch");

exports.createcomment = tryCatch(async(req,res,next)=>{
    console.log('createeeeee')
    console.log(req.user)

    let newcomment = await comments.create({

        comment:req.body.comment,
        user_id:req.user._id,
        blog_id:req.body.blog_id
    })
    
    res.status(200).json({
        status:"success",
        data:newcomment
    })
})

exports.getcomment = tryCatch(async(req,res,next)=>{

    let id = req.params.id

    let getcomment = await comments.find({blog_id:id})

    res.status(200).json({
        status:"success",
        data:getcomment
    })
})