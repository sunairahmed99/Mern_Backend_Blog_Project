const users = require("../Models/UserSchema");
const AppError = require("../Utils/AppError");
const ForgotEmail = require("../Utils/ForgotEmail");
const tryCatch = require("../Utils/tryCatch");
const crypto = require('crypto')
const fs = require('fs')
const jwt = require('jsonwebtoken');

exports.getuser = tryCatch(async(req,res,next)=>{

    let user = await users.findById(req.user.id)

    res.status(200).json({
        status:"success",
        data:user
    })
})

exports.RegisterUser = tryCatch(async(req,res,next)=>{

    let image

    if(req.file){
        image = req.file.filename

    }
    
    let newuser = await users.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        image:image,
        password:req.body.password,
        conform_password:req.body.conform_password
    })

    
    let token = jwt.sign({id:newuser.id},process.env.SECRET_KEY,{
        expiresIn:process.env.EXPIRES_IN
    })

    res.status(200).json({
        status:"success",
        token,
        data:newuser
    })
})

exports.LoginUser = tryCatch(async(req,res,next)=>{

    const {email,password} = req.body
    console.log(email)

    if(!email || !password) return next(new AppError('invalid email and password',404))
     
    let newuser = await users.findOne({email:email}).select('password')
    console.log(newuser)
    
    if(!newuser) return next(new AppError('invalid email and password',404))

    if(! await newuser.checkpassword(password,newuser.password)){
        return next(new AppError('invalid email and password',404))
    }
    
    let user = await users.findById(newuser.id)

    let token = jwt.sign({id:user.id},process.env.SECRET_KEY,{
        expiresIn:process.env.EXPIRES_IN
    })

    res.status(200).json({
        status:"success",
        token,
        data:user,
    })
})

exports.protect = tryCatch(async(req,res,next)=>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) return next(new AppError('please logged in first',404))
     
    let decode = jwt.verify(token,process.env.SECRET_KEY)

    let olduser = await users.findById(decode.id)

    if(!olduser) return next(new AppError('please login again',404))
     
    if(olduser.passwordupdatecheck(decode.iat)){
        return next(new AppError('login again',404))
    }
    
    req.user = olduser
    
    next()
})

exports.updateUser = tryCatch(async(req,res,next)=>{

    let image

    if(req.file){

        image = req.file.filename
        let oldimage = req.body.oldimage
        let oldimagepath = `./Multer/images/${oldimage}`

        fs.unlink(oldimagepath, err =>{
            if(err){
                console.log('image not deleted', err)
            }
            else{
                console.log('image deleted')
            }
        })

    }

    let newuser = await users.findByIdAndUpdate(req.user.id,{

        name:req.body.name,
        image:image
    },{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        status:"success",
        data:newuser
    })
})

exports.updatepassword = tryCatch(async(req,res,next)=>{

    let id = req.params.id
    let oldpassword = req.body.oldpassword
    let user = await users.findById(id).select('password')

    if(!(await user.checkpassword(oldpassword,user.password))){
        return next(new AppError('old password not correct'))
    }

    user.password = req.body.password
    user.conform_password = req.body.conform_password
    await user.save()

    res.status(200).json({
        status:"success",
        data:user
    })
})

exports.forgotpassword = tryCatch(async(req,res,next)=>{

    let email = req.body.email

    if(!email){
        return next(new AppError('please provide email',401))
    }

    let user = await users.findOne({email:email})

    if(!user){
        return next(new AppError('user not found this email',401))
    }

    if(user.role === 'admin'){
        return next(new AppError('cant forgot this email',401))
    }

    console.log(user)

    let resettoken = user.createpasswordtoken()

    await user.save({validateBeforeSave : false})

    let reseturl = `${req.protocol}://${req.get('host')}/reset/password/page/${resettoken}`;

    let message = `forgot password link if you want to forgot password click this link:${reseturl}`

    try{

        await ForgotEmail({

            email:user.email,
            subject:'password reset link',
            text:message
        })

        res.status(200).json({
            status:"success",
            message:'email sent successfully to your email'
        })

    }catch(error){
         console.log(error)
         user.passresettok = undefined
         user.passresetexp = undefined
         await user.save({validateBeforeSave:false})

       return next(new AppError('server down try later',500))
    }
})

exports.resetpassword = tryCatch(async(req,res,next)=>{

    let token = req.params.token

    let resettoken = crypto.createHash('sha256').update(token).digest('hex')

    let user = await users.findOne({passresettok:resettoken, passresetexp:{$gt:Date.now()}})

    if(!user){
        return next(new AppError('token invalid or expired forgotpass again',401))
    }

    user.password = req.body.password
    user.conform_password = req.body.conform_password
    user.passresettok = undefined
    user.passresetexp = undefined
    await user.save()

    let tokenn = jwt.sign({id:user.id},process.env.SECRET_KEY,{
        expiresIn:process.env.EXPIRES_IN
    })

    res.status(200).json({
        status:'success',
        tokenn,
        data:user
    })

})