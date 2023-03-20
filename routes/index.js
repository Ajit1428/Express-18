const router =  require('express').Router();
const authMid = require("../src/middleware/auth.middleware")

const homeRoutes = require('./home.route')
const authRoutes = require('./auth.route')
const userRoutes = require('./user.route')


router.use(homeRoutes)
router.use('/auth',authRoutes)
router.use('/user',authMid, userRoutes)

module.exports =  router;



