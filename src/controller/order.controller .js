const orderSer = require("../service/order.service ")
const slugify = require('slugify')
const productSer = require("../service/product.service")
const { ObjectId } = require("mongodb")

class OrderController { 
    createOrder = async (req, res, next) => {
       try {
            let data = req.body
            if(!data.cart || data.cart.length <= 0){
                next({status: 400, msg: "Cart cannot be empty"})
            }
            let cart = []
            let productsId = data.cart.map((item) => new ObjectId(item.productId))
            let productList = await orderSer.findProductsById(productsId)
            let totalAmount = 0
            productList.map((item) => {
                
                data.cart.map((cartItem)=> {
                        let qty = cartItem.qty
                        if(item._id.equals(cartItem.productId)){
                            totalAmount = qty * item.actualPrice
                            cart.push({
                                productId : item._id,
                                qty: qty,
                                amount: qty * item.actualPrice
                            })
                        }
                    })
                 
                
            })

            let cartDetails = {
                buyerId : req.authUser._id,
                cart: cart,
                totalAmount : totalAmount,
                status: "pending",
                createdBy: req.authUser._id
            }


            let response = await orderSer.storeOrder(cartDetails)
            if (response){
                res.json({
                    result: response,
                    status: true,
                    msg: "Your order has been placed successfully. Your order id is : " + response._id
                })
            }
            else{
                next({status: 400, msg: "There was error while placing the order"})
            }

       } catch (error) {
            next({status: 400, msg: "Error while creating the order"})
            console.log(error)
       }
    }

    updatePayment = async (req, res, next) => {
        try {
            let payload = req.body;
            let updateData = {
                paymentStatus : payload.paymentStatus,
                payment: {
                    paymentType: payload.paymentStatus === 'cod' ? 'cod' : payload.transaction.mode,
                    amount: payload.transaction.amount,
                    transactionId : payload.paymentStatus === 'cod' ? null : payload.transaction.transactionId
                }
            }

            let updateResponse = await orderSer.updatedOrder(updateData, req.params.orderId)
            res.json({
                result: updateData,
                status: true,
                msg: "Payment updated successfully"
            })
        } catch (error) {
            next({status: 400, msg: "Error while updating payment"})
        }
    }

    getAllOrderByAdmin = async (req, res, next) => {
        try {
            let response = await orderSer.getAllOrder();
            res.json({
                result: response,
                status: true,
                msg: "List of all the products",
                meta: null
            })
        } catch (error) {
            next({status: 400, msg: "Error while listing order"})
        }
    }

    getOrderByUserId = async (req, res, next) => {
        try {
            let response = await orderSer.getAllOrder({
                buyerId: req.params.userId
            });
            res.json({
                result: response,
                status: true,
                msg: "List of all the products of the user",
                meta: null
            })
        } catch (error) {
            next({status: 400, msg: "Error while listing order"})
        }
    }


    deleteOrder = async (req, res, next) => {
        try {
            let delPrev = await orderSer.deleteOrderById(req.params.id)
            if(delPrev){
            res.json({
                result: delPrev,
                msg: "Order deleted successfully",
                status: true,
                meta: null
            })
        }
        else{
            next({status: 404, msg:"Content does not exist"})
        }
        } catch (error) {
            next({status: 400, msg: "Error while deleting the order"})
        }
    }

}

    

let orderCon =  new OrderController();
module.exports = orderCon;