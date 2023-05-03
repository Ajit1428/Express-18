const router = require('express').Router();
const categoryCon = require('../src/controller/category.controller');
const authMid = require('../src/middleware/auth.middleware')
const { isAdmin } = require('../src/middleware/rbac.middleware');
const uploader = require('../src/middleware/uploader.middleware');

router.get('/:slug', categoryCon.getDetailBySlug)

router.route("/")
    .get(authMid, isAdmin, categoryCon.listAllCategory)
    .post(authMid, isAdmin, uploader.single('image'), categoryCon.createCategory)

router.route("/:id")
    .patch(authMid, isAdmin, uploader.single('image'), categoryCon.updateCategory)
    .delete(authMid, isAdmin,categoryCon.deleteCategory)
    

module.exports = router