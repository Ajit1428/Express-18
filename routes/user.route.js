const router = require('express').Router();
const {isAdmin} = require('../src/middleware/rbac.middleware')
const userCon = require("../src/controller/user.controller")


router.route('/')
    .post( isAdmin , userCon.create)
    .get( userCon.index)

router.route('/:id')
    .get( isAdmin , userCon.show)
    .put( isAdmin, userCon.update)
    .delete( isAdmin, userCon.delete)




module.exports =  router