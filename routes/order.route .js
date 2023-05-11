const router = require('express').Router();
const orderCon = require('../src/controller/order.controller ');
const authMid = require('../src/middleware/auth.middleware')
const { isAdmin, isAdminSeller, isCustomer } = require('../src/middleware/rbac.middleware');
const uploader = require('../src/middleware/uploader.middleware');

router.patch("/:orderId/payment", authMid, isCustomer, orderCon.updatePayment)
router.get("/:userId/myorders", authMid, isCustomer, orderCon.getOrderByUserId)
router.route("/")
    .post(authMid, isCustomer, uploader.array('images'), orderCon.createOrder)
    .get(authMid, isAdmin, orderCon.getAllOrderByAdmin)

module.exports = router