const express = require('express');
const { createcomment, getcomment } = require('../Controllers/CommentController');
const { protect } = require('../Controllers/AuthController');

const commentRouter = express.Router()

commentRouter.route('/create').post(protect,createcomment)
commentRouter.route('/get/:id').get(getcomment)

module.exports = commentRouter