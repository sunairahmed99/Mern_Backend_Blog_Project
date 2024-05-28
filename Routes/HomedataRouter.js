const express = require('express');
const { getallHomeBlog, createHomeBlog, deleHomeBlog, getlatestblog, getHomeBlog, updateHomeBlog } = require('../Controllers/HomedataController');
const {homeblogupload} = require('../Multer/multer');

const HomeRouter = express.Router()

HomeRouter.route('/getall').get(getallHomeBlog)
HomeRouter.route('/get').get(getlatestblog)
HomeRouter.route('/getdata/:id').get(getHomeBlog)
HomeRouter.route('/create').post(homeblogupload.single('image'),createHomeBlog)
HomeRouter.route('/update/:id').post(homeblogupload.single('image'),updateHomeBlog)
HomeRouter.route('/del/:id').delete(deleHomeBlog)

module.exports = HomeRouter