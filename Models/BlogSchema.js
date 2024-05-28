const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true, 'name required'],
    },
    description:{
        type:String,
        required:[true, 'description required'],
    },
    image:{
        type:String,
        required:false
    },
    category_id:{
        type:mongoose.Schema.ObjectId,
        ref:'categories'
    },
    status:{
        type:String,
        default:'pending'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    }
})

const blogdata = mongoose.model('blogdata',BlogSchema) 

module.exports = blogdata