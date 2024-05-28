const express = require('express');
const { getallBlog, createblog, getBlogdata, updateblog, delblog, getapprovedata, getallcategoryblog, singleblogdata, allblog } = require('../Controllers/BlogController');
const { Blogupload } = require('../Multer/multer');
const { protect } = require('../Controllers/AuthController');

const blogRouter = express.Router()


blogRouter.route('/getall').get(protect,getallBlog)
blogRouter.route('/allblog').get(protect,allblog)
blogRouter.route('/getdata/:id').get(protect,getBlogdata)
blogRouter.route('/getapprovedata').get(getapprovedata)
blogRouter.route('/getsingleblog/:id').get(singleblogdata)
blogRouter.route('/getcatblog/:id').get(getallcategoryblog)
blogRouter.route('/create').post(protect,Blogupload.single('image'),createblog)
blogRouter.route('/update/:id').patch(protect,Blogupload.single('image'),updateblog)
blogRouter.route('/del/:id').delete(protect,delblog)

module.exports = blogRouter