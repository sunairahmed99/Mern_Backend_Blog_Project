const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({

    comment:{
        type:String,
        required:true,
    },
    blog_id:{
        type:mongoose.Schema.ObjectId,
        ref:'blogdata'

    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
    }
})

commentSchema.pre(/^find/, function(next){
    this.populate('user_id')
    next()
})

const comments = mongoose.model('comments',commentSchema)

module.exports = comments