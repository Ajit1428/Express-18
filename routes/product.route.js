const router = require('express').Router();
const productCon = require('../src/controller/product.controller');
const authMid = require('../src/middleware/auth.middleware')
const { isAdmin } = require('../src/middleware/rbac.middleware');
const uploader = require('../src/middleware/uploader.middleware');

router.get('/admin', productCon.getActiveProduct)
router.get('/:slug', productCon.getDetailBySlug)

router.route("/")
    .get(authMid, isAdmin, productCon.listAllProduct)
    .post(authMid, isAdmin, uploader.array('images'), productCon.createProduct)

router.route("/:id")
    .patch(authMid, isAdmin, uploader.array('images'), productCon.updateProduct)
    .delete(authMid, isAdmin,productCon.deleteProduct)
    

module.exports = router