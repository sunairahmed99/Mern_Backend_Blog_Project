const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const UserSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true, 'name required']
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'email required'],
        validate:[validator.isEmail, 'invalid email syntax'],
        
    },
    phone:{
        type:Number,
        required:[true, 'phone number required'],
        minlength:[11, '11 numbers required'],
        maxlength:[11, '11 numbers required'],
    },
    password:{
        type:String,
        required:[true, 'password required'],
        minlength:[6,'password atleast 6 characters'],
        maxlength:[12, 'password not greater than 20 characters'],
        select:false
    },
    conform_password:{
        type:String,
        required:[true, 'password required'],
        minlength:[6,'password atleast 6 characters'],
        maxlength:[12, 'password not greater than 20 characters'],
        validate:{
            validator:function(val){
                return val === this.password
            },
            message:'password conform password not match'
        }
    },
    image:{
        type:String,
    },
    role:{
        type:String,
        default:'user'
    },
    passwordchangedate:Date,
    passresettok:String,
    passresetexp:Date,
})

UserSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next
    this.password = await bcrypt.hash(this.password,12)
    this.conform_password = undefined
    next()
})

UserSchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew) return next()

        this.passwordchangedate = Date.now()
        next()
})

UserSchema.methods.checkpassword = async function(password,oldpassword){

    return await bcrypt.compare(password,oldpassword)
}

UserSchema.methods.passwordupdatecheck = function(jwttime){
    if(this.passwordchangedate){

        let date = parseInt(this.passwordchangedate.getTime()/1000,10)

        jwttime < date

    }

    return false
}

UserSchema.methods.createpasswordtoken = function(){

    let rantoken = crypto.randomBytes(30).toString('hex')
    this.passresettok = crypto.createHash('sha256').update(rantoken).digest('hex');
    this.passresetexp = Date.now() + 10 * 60 * 1000

    return rantoken

}

const users = mongoose.model('users', UserSchema)

module.exports = users