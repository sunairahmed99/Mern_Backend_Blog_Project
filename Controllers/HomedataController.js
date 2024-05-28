const HomeBlog = require("../Models/HomedataSchema");
const tryCatch = require("../Utils/tryCatch");
const fs = require('fs')

exports.getallHomeBlog = tryCatch(async(req,res,next)=>{

    let newdata = await HomeBlog.find().sort({_id: -1}).populate('category_id')

    res.status(200).json({
        status:"success",
        data:newdata
    })
})

exports.getHomeBlog = tryCatch(async(req,res,next)=>{

    let newdata = await HomeBlog.findById(req.params.id).populate('category_id')

    res.status(200).json({
        status:"success",
        data:newdata
    })
})

exports.getlatestblog = tryCatch(async(req,res,next)=>{

    let newdata = await HomeBlog.find().sort({_id: -1}).limit(1).populate('category_id')

    res.status(200).json({
        status:"success",
        data:newdata
    })

})

exports.createHomeBlog = tryCatch(async(req,res,next)=>{

    console.log(req.body)

    let createdata = HomeBlog.create({
        name:req.body.name,
        description:req.body.description,
        image:req.file.filename,
        category_id:req.body.category
    })

    res.status(200).json({
        status:"success",
        data:createdata
    })

})

exports.updateHomeBlog = tryCatch(async(req,res,next)=>{

    let image
    console.log(req.body.oldimage)

    if(req.file){

        image = req.file.filename
        let oldimage = `./Multer/images/${req.body.oldimage}`

        fs.unlink(oldimage, (err)=>{
            if(err){
                console.log('not deleted',err)
            }
            else{
                console.log('deletedddd')
            }
        })
    }

    let newcat = await HomeBlog.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        description:req.body.description,
        category_id:req.body.category_id,
        image:image ? image : req.body.image
    },{
        new:true,
        runValidators:true
    }
)

    res.status(200).json({
        status:"success",
        data:newcat
    })
})

exports.deleHomeBlog = tryCatch(async(req,res,next)=>{

    let newblog = await HomeBlog.findByIdAndDelete(req.params.id)

    res.status(200).json({
        status:"success",
        data:newblog
    })
})