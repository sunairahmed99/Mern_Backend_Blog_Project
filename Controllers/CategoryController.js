const categories = require("../Models/CategorySchema");
const tryCatch = require("../Utils/tryCatch");
const fs = require('fs')


exports.getallcategories = tryCatch(async(req,res,next)=>{
    

    let newcat = await categories.find()

    res.status(200).json({
        status:"success",
        data:newcat
    })
})

exports.getcategories = tryCatch(async(req,res,next)=>{
    let id = req.params.id
    

    let newcat = await categories.findById(id)

    res.status(200).json({
        status:"success",
        data:newcat
    })
})

exports.createcategories = tryCatch(async(req,res,next)=>{


    let newcat = await categories.create({
        name:req.body.name,
        image:req.file.filename
    })

    res.status(200).json({
        status:"success",
        data:newcat
    })
})

exports.updatecategories = tryCatch(async(req,res,next)=>{
    console.log('body',req.body)

    let image;

    if(req.file){

        const oldImagePath = `./Multer/images/${req.body.oldimage}`;

        fs.unlink(oldImagePath, (err) => {
            if (err) {
                console.error('Error deleting old image:', err);
                // Handle the error accordingly
            } else {
                console.log('Old image deleted successfully');
            }
        });

        image = req.file.filename
    }

    console.log(image)
    console.log(req.body.oldimage)

    let newcat = await categories.findByIdAndUpdate(req.params.id,{

        name: req.body.name,
        // Assuming `image` is a file input field
        image: image ? image : req.body.image,
    },{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        status:"success",
        data:newcat
    })
})

exports.deletecategories = tryCatch(async(req,res,next)=>{

    let id = req.params.id

    let newcat = await categories.findByIdAndDelete(id)

    res.status(200).json({
        status:"success",
        data:newcat
    })
})