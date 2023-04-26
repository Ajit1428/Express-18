const router = require('express').Router();
const brandCon = require('../src/controller/brand.controller');
const authMid = require('../src/middleware/auth.middleware')
const { isAdmin } = require('../src/middleware/rbac.middleware');
const uploader = require('../src/middleware/uploader.middleware');


router.route("/")
    .get(authMid, isAdmin, brandCon.listAllBrand)
    .post(authMid, isAdmin, uploader.single('image'), brandCon.createBrand)

router.route("/:id")
    .patch(authMid, isAdmin, uploader.single('image'), brandCon.updateBrand)
    .delete(authMid, isAdmin,brandCon.deleteBrand)
    

module.exports = router