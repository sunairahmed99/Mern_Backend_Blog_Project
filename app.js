const express = require('express')
const app = express()
const cors = require('cors')
const ErrorController = require('./Controllers/ErrorController')
const AppError = require('./Utils/AppError')
const categoryRouter = require('./Routes/CategoryRouter')
const HomeRouter = require('./Routes/HomedataRouter')
const blogRouter = require('./Routes/blogRouter')
const UserRouter = require('./Routes/UserRouter')
const commentRouter = require('./Routes/CommentRoutes')
//require('./Multer/')


app.use(cors())
app.options('*', cors());
app.use(express.json())
app.use('/category',express.static('./Multer/images/category'))
app.use('/HomeBlog',express.static('./Multer/images/HomeBlog'))
app.use('/Blog',express.static('./Multer/images/Blog'))
app.use('/User',express.static('./Multer/images/User'))



app.use('/category',categoryRouter)
app.use('/Home',HomeRouter)
app.use('/blog',blogRouter)
app.use('/user',UserRouter)
app.use('/comment',commentRouter)

// app.all('*',(req,res,next)=>{
//     next(new AppError('invalid route',404))
// })


app.use(ErrorController)


module.exports = app