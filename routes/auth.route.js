const router = require('express').Router();
const authCon = require('../src/controller/auth.controller')

router.post('/login', authCon.login )

router.post('/register', authCon.register )


module.exports = router;