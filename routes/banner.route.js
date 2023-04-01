const router = require('express').Router();
const bannerCon = require('../src/controller/banner.controller');
const authMid = require('../src/middleware/auth.middleware')
const { isAdmin } = require('../src/middleware/rbac.middleware');
const uploader = require('../src/middleware/uploader.middleware');


router.route("/")
    .get(authMid, isAdmin, bannerCon.listAllBanner)
    .post(authMid, isAdmin, uploader.single('image'), bannerCon.createBanner)

router.route("/:id")
    .patch(authMid, isAdmin, uploader.single('image'), bannerCon.updateBanner)
    .delete(authMid, isAdmin,bannerCon.deleteBanner)
    

module.exports = router