const express = require('express');
const { RegisterUser, LoginUser, protect, getuser, updateUser, updatepassword, forgotpassword, resetpassword } = require('../Controllers/AuthController');
const { Userupload } = require('../Multer/multer');

const UserRouter = express.Router()

UserRouter.route('/getuser').get(protect,getuser)
UserRouter.route('/register').post(Userupload.single('image'),RegisterUser)
UserRouter.route('/update/:id').patch(protect,Userupload.single('image'),updateUser)
UserRouter.route('/update/password/:id').patch(protect,updatepassword)
UserRouter.route('/forgot/password').post(forgotpassword)
UserRouter.route('/reset/password/:token').patch(resetpassword)
UserRouter.route('/login').post(LoginUser)


module.exports = UserRouter