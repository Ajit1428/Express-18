const Joi = require("joi")
const ProductModel = require("../model/product.model")

class ProductService { 
    validateData = async (data) => {
        try{
        const validate = Joi.object({
            title: Joi.string().min(3).required(),
            description: Joi.string().required(),
            categories: Joi.array().items(Joi.string()).empty(),
            brand: Joi.string().allow(null,""),
            price: Joi.number().min(1),
            discount: Joi.string().min(0).max(100),
            sellerId: Joi.string().allow(null,""),
            featured: Joi.bool().default(false),
            status: Joi.string().required(),
            images: Joi.array().items(Joi.string()).allow(null, "")
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

    storeProduct = async (data) => {
        try {
            let product = new ProductModel(data);
            return await product.save()

        } catch (err) {
            throw err
        }
    }

    updatedProduct = async (data, id) => {
        try {
            let response = await ProductModel.findByIdAndUpdate(id, {
                $set : data
            })
            return response
        } catch (error) {
            throw error
            
        }
    }

    deleteProductById = async (id) => {
        try {
            let delPrev = await ProductModel.findByIdAndRemove(id)
            return delPrev
        
        } catch (error) {
            throw error
            
        }
    }

    getAllProduct = async () => {
        try {
            const response = await ProductModel.find()
            .populate("categories")
            .populate("brand")
            .populate("sellerId")
            .populate("createdBy")
            return response
        } catch (err) {
            throw err
        }
    }

    getById = async (id) => {
        try {
            let product= await ProductModel.findById(id)
            .populate("categories")
            .populate("brand")
            .populate("sellerId")
            .populate("createdBy")
            return product
        } catch (error) {
            throw error
        }
    }
    getProductBySlug = async (slug) => {
        try {
            let product= await ProductModel.findOne({
                slug: slug
            })
            .populate("categories")
            .populate("brand")
            .populate("sellerId")
            .populate("createdBy")
            return product
        } catch (error) {
            throw error
        }
    }

    getActiveProducts = async () => {
        try {
            let response = await ProductModel.find({
                status: "active"
            })
            .populate("categories")
            .populate("brand")
            .populate("sellerId")
            .populate("createdBy")
            return response
        } catch (error) {
            throw error
        }
    }

   
}

let productSer = new ProductService();
module.exports = productSer

