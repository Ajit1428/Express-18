const Joi = require("joi")
const CategoryModel = require("../model/category.model")

class CategoryService { 
    validateData = async (data) => {
        try{
        const validate = Joi.object({
            title: Joi.string().min(3).required(),
            parent: Joi.string().allow(null),
            status: Joi.string().required(),
            image: Joi.string().required()
        })

        let validateData = await validate.validateAsync(data)
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

    storeCategory = async (data) => {
        try {
            let category = new CategoryModel(data);
            return await category.save()

        } catch (err) {
            throw err
        }
    }

    updatedCategory = async (data, id) => {
        try {
            let response = await CategoryModel.findByIdAndUpdate(id, {
                $set : data
            })
            return response
        } catch (error) {
            throw error
            
        }
    }

    deleteCategoryById = async (id) => {
        try {
            let delPrev = await CategoryModel.findByIdAndRemove(id)
            return delPrev
        
        } catch (error) {
            throw error
            
        }
    }

    getAllCategory = async () => {
        try {
            const response = await CategoryModel.find()
            .populate("parent")
            .populate("createdBy")
            return response
        } catch (err) {
            throw err
        }
    }

    getById = async (id) => {
        try {
            let category= await CategoryModel.findById(id)
            .populate("parent")
            .populate("createdBy")
            return category
        } catch (error) {
            throw error
        }
    }
    getCategoryBySlug = async (slug) => {
        try {
            let category= await CategoryModel.findOne({
                slug: slug
            })
            .populate("parent")
            .populate("createdBy")
            return category
        } catch (error) {
            throw error
        }
    }
}

let categorySer = new CategoryService();
module.exports = categorySer

