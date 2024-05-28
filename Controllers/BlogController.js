const blogdata = require("../Models/BlogSchema");
const tryCatch = require("../Utils/tryCatch");
const fs = require('fs');

exports.getallBlog = tryCatch(async(req,res,next)=>{

    let query = await blogdata.find({user:req.user._id}).populate({
        path: 'category_id',
        select: 'name'
    })

    res.status(200).json({
        status:"success",
        data:query
    })
})

 exports.getBlogdata = tryCatch(async(req,res,next)=>{

    let query = await blogdata.findById(req.params.id).populate({
        path: 'category_id',
        select: 'name'
    })

    res.status(200).json({
        status:"success",
        data:query
    })
})

exports.getapprovedata = tryCatch(async(req,res,next)=>{

    let newdata = await blogdata.find({status:'Approved'}).populate('category_id')

    res.status(200).json({
        status:"success",
        data:newdata
    })
})

exports.getallcategoryblog = tryCatch(async(req,res,next)=>{

    let newdata = await blogdata.find({category_id:req.params.id}).populate('category_id')

    res.status(200).json({
        status:"success",
        data:newdata
    })

})

exports.singleblogdata = tryCatch(async(req,res,next)=>{

    let data = await blogdata.findById(req.params.id)

    res.status(200).json({
        status:"success",
        data:data
    })
})

exports.createblog = tryCatch(async(req,res,next)=>{

    let newblog = await blogdata.create({
        name:req.body.name,
        description:req.body.description,
        category_id:req.body.category,
        user:req.user._id,
        image:req.file.filename,
    })

    res.status(200).json({
        status:"success",
        data:newblog
    })

})

exports.allblog = tryCatch(async(req,res,next)=>{

    let newdata = await blogdata.find().populate('user').populate('category_id')

    res.status(200).json({
        status:"success",
        data:newdata
    })
})

exports.updateblog = tryCatch(async(req,res,next)=>{
    console.log(req.body)
    

    let image


    if(req.file){

         image = req.file.filename
        let oldimage = req.body.oldimage

        let oldimagepath = `./Multer/images/${oldimage}`

        fs.unlink(oldimagepath, (err)=>{
            if(err){
                console.log('image not deleted',err)

            }else{
                console.log('image  deleted')
            }
        })

    }

        let data = await blogdata.findByIdAndUpdate(req.params.id,{

            name:req.body.name,
            description:req.body.description,
            category_id:req.body.category_id,
            user:req.user._id,
            status:req.body.status,
            image:image ? image : req.body.image
        },{
            new:true,
            runValidators:true
        })

        res.status(200).json({
            status:"success",
            data:data
        })

    
})



exports.delblog = tryCatch(async(req,res,next)=>{

    let data = await blogdata.findByIdAndDelete(req.params.id)

    res.status(200).json({
        status:"success",
        data:data
    })
})