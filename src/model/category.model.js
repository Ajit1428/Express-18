const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
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
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
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
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    
    
},{
    autoCreate: true,
    autoIndex: true,
    timestamps: true
})

// CategorySchema.virtual("parentInfo", {
//     foreignField: "_id",
//     localField : 'parent',
//     ref: 'Category'
// })

const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel;




