const mongoose = require('mongoose');

const HomeBlogSchema = mongoose.Schema({

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
    }
})

const HomeBlog = mongoose.model('HomeBlog',HomeBlogSchema)

module.exports = HomeBlog