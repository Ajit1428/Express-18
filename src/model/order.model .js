const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
       
    },
    cart: [{
        productId : {
            type : mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        },
        qty : {
            type: Number,
            required: true,
            min: 1
        },
        amount: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 1
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'cod', 'onilne'],
        default: 'unpaid'
    },
    payment : {
        paymentType: {type: String, enum: ['cod', 'esewa', 'khalti', 'online banking'], default: "cod"},
        amount : Number,
        transactionId: String
    },
    status: {
        type: String,
        enum : ['pending', 'cancelled', 'delivered'],
        default: 'new'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null

    },
    
    
    
},{
    autoCreate: true,
    autoIndex: true,
    timestamps: true
})


const OrderModel = mongoose.model('Order', OrderSchema);
module.exports = OrderModel;




