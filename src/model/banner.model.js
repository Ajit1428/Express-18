const mongoose = require('mongoose')
const BannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min : 3
    },
    link: String,
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

const BannerModel = mongoose.model('Banner', BannerSchema);
module.exports = BannerModel;




