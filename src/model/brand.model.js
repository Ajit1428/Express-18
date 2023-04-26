const mongoose = require('mongoose')
const BrandSchema = new mongoose.Schema({
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
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ['active', 'inactive'],
        default: 'inactive'
    },
    creadtedby: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    
    
},{
    autoCreate: true,
    autoIndex: true,
    timestamps: true
})

const BrandModel = mongoose.model('Brand', BrandSchema);
module.exports = BrandModel;




