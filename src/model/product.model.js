const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min : 3,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description : {
        type: String,
        required: true
    },
    categories: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null

    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        default: null

    },
    price: {
        type: Number,
        min: 1,
        required: true
    },
    actualPrice: {
        type: Number,
        min: 1,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        max: 100
    },
    sellerId : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    featured : {
        type: Boolean,
        default: false
    },

    images: [{
        type: String
    }],
    status: {
        type: String,
        enum : ['active', 'inactive'],
        default: 'inactive'
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

// ProductSchema.virtual("actualPrice").set(function(){
//     return this.price - this.price * this.discount/100
// })



const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;




