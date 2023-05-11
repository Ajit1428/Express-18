const Joi = require("joi")
const OrderModel = require("../model/order.model ")
const ProductModel = require("../model/product.model")

class OrderService { 
    validateData = async (data) => {
        try{
        const validate = Joi.object({
            buyerId: Joi.string().required(),
            cart: Joi.array().items(Joi.object({
                productId: Joi.string(). required(),
                qty: Joi.number().min().required(),
                amount: Joi.number().min().required()
            })),
            totalAmount: Joi.number().min().required(),
            status: Joi.string().allow("new", "cancelled", "delivered").default("new")
        })

        const validateData = await validate.validateAsync(data)
        if (validateData.details?.[0].message){
            throw validateData.details?.[0].message
        }
        else
        {
            return validateData
            
        }
    
    } 
    catch (err) 
    {   
        let errMsg = "Error while creating content"
        if (err.details?.[0].message){

            errMsg =  err.details?.[0].message
        }
        else{
            throw new Error(errMsg)
        }
    }
}

    storeOrder = async (data) => {
        try {
            let order = new OrderModel(data);
            return await order.save()

        } catch (err) {
            throw err
        }
    }

    updatedOrder = async (data, id) => {
        try {
            let response = await OrderModel.findByIdAndUpdate(id, {
                $set : data
            })
            return response
        } catch (error) {
            throw error
            
        }
    }

    deleteOrderById = async (id) => {
        try {
            let delPrev = await OrderModel.findByIdAndRemove(id)
            return delPrev
        
        } catch (error) {
            throw error
            
        }
    }

    getAllOrder = async (filter = {}) => {
        try {
            const response = await OrderModel.find(filter)
            .populate("buyerId")
            .populate("createdBy")
            return response
        } catch (err) {
            throw err
        }
    }

    getById = async (id) => {
        try {
            let order= await OrderModel.findById(id)
            .populate("buyerId")
            .populate("createdBy")
            return order
        } catch (error) {
            throw error
        }
    }

    findProductsById = async (productId) => {
        try {
            let response = await ProductModel.find({
                _id : {$in: productId}
            })
            return response
        } catch (err) {
            throw err
        }
    }

    getOrdersBySeller = async (sellerId) => {
        try {
            let pipeline = [
                {
                  '$lookup': {
                    'from': 'products', 
                    'localField': 'cart.productId', 
                    'foreignField': '_id', 
                    'as': 'cartDetails'
                  }
                }, {
                  '$match': {
                    'cartDetails.sellerId': new ObjectId(sellerId)
                  }
                }
              ]
              let response = await OrderModel.aggregate(pipeline)
              return response
        } catch (error) {
            throw error
        }
    }


 
}

let orderSer = new OrderService();
module.exports = orderSer

