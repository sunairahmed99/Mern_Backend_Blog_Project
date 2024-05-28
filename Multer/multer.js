const multer = require('multer');
const path = require('path');

const Categorystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../Multer/images'))
    },
    filename: function (req, file, cb) {
      cb(null, 'category/' + Date.now() + file.originalname)
    }
  })

  const HomeBlogstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../Multer/images'))
    },
    filename: function (req, file, cb) {
      cb(null, 'HomeBlog/' + Date.now() + file.originalname)
    }
  })

  const Blogstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../Multer/images'))
    },
    filename: function (req, file, cb) {
      cb(null, 'Blog/' + Date.now() + file.originalname)
    }
  })

  const Userstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../Multer/images'))
    },
    filename: function (req, file, cb) {
      cb(null, 'User/' + Date.now() + file.originalname)
    }
  })
  
  const catupload = multer({ storage: Categorystorage })
  const homeblogupload = multer({ storage: HomeBlogstorage })
  const Blogupload = multer({ storage: Blogstorage })
  const Userupload = multer({ storage: Userstorage })

  module.exports = {catupload,homeblogupload,Blogupload,Userupload}
