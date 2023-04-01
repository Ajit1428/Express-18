const router =  require('express').Router();
const authMid = require("../src/middleware/auth.middleware")

const homeRoutes = require('./home.route')
const authRoutes = require('./auth.route')
const userRoutes = require('./user.route')
const bannerRoutes = require('./banner.route')


router.use(homeRoutes)
router.use('/auth',authRoutes)
router.use('/user',authMid, userRoutes)
router.use('/banner',bannerRoutes)

module.exports =  router;



