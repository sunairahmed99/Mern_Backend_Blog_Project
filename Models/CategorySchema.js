const mongoose = require('mongoose');

const catdata = mongoose.Schema({

    name:{
        type:String,
        required:[true, 'name required']
    },
    image:{
        type:String,
        required:false
    },
   
})

const categories = mongoose.model('categories',catdata)

module.exports = categories