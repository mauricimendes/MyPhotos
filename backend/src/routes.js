const express = require('express')
const User = require('./controllers/UserController')
const Photo = require('./controllers/PhotoController')
const authMiddleware = require('./middlewares/auth')
const multer = require('multer')
const multerConfigUser = require('./config/multerUser')
const multerConfigPhoto = require('./config/multerPhoto')
const path = require('path')

const routes = express.Router()
const uploadUser = multer(multerConfigUser)
const uploadPhoto = multer(multerConfigPhoto)

routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
routes.use('/uploads_photo', express.static(path.resolve(__dirname, '..', 'uploads_photo')))

routes.get('/user', User.index)

routes.post('/user', uploadUser.single('user_image'), User.create)
routes.get('/me/:user_id', User.show)
routes.post('/login', User.login)

routes.use(authMiddleware)

routes.post('/photo', uploadPhoto.single('photo_image'), Photo.create)
routes.get('/photo', Photo.show)
routes.get('/photos', Photo.index)

module.exports = routes