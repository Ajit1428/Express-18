const router = require('express').Router();
const authCon = require('../src/controller/auth.controller')
const uploader = require('../src/middleware/uploader.middleware')




router.post('/login', authCon.login )

router.post('/register', uploader.single('image'), authCon.register )

router.get('activate/:token', authCon.activateUser)


module.exports = router;