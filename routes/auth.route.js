const router = require('express').Router();
const authCon = require('../src/controller/auth.controller');
const authMid = require('../src/middleware/auth.middleware');
const uploader = require('../src/middleware/uploader.middleware')




router.post('/login', authCon.login )

router.post('/register', uploader.single('image'), authCon.register )

router.get('/me', authMid, authCon.getLoggedinUser)

router.get('activate/:token', authCon.activateUser)


module.exports = router;