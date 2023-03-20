const router =  require('express').Router();

const homeRoutes = require('./home.route')
const authRoutes = require('./auth.route')
const userRoutes = require('./user.route')


router.use('/home',homeRoutes)
router.use('/auth', authRoutes)
router.use('/user', userRoutes)

module.exports =  router;



