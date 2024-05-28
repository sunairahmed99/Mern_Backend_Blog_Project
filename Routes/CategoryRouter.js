const express = require('express');
const { getallcategories, createcategories, updatecategories, deletecategories, getcategories } = require('../Controllers/CategoryController');
const {catupload} = require('../Multer/multer')


const categoryRouter = express.Router()

categoryRouter.route('/get').get(getallcategories)
categoryRouter.route('/get/:id').get(getcategories)
categoryRouter.route('/create').post(catupload.single('image'),createcategories)
categoryRouter.route('/update/data/:id').patch(catupload.single('image'),updatecategories)
categoryRouter.route('/del/:id').delete(deletecategories)


module.exports = categoryRouter