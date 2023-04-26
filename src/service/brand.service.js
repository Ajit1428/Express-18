const Joi = require("joi")
const BrandModel = require("../model/brand.model")

class BrandService { 
    validateData = async (data) => {
        try{
        const validate = Joi.object({
            title: Joi.string().min(3).required(),
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
        const errMsg = "Error while creating content"
        if (err.details?.[0].message){

            errMsg =  err.details?.[0].message
        }
        else{
            throw new Error(errMsg)
        }
    }
}

    storeBrand = async (data) => {
        try {
            let brand = new BrandModel(data);
            return await brand.save()

        } catch (err) {
            throw err
        }
    }

    updatedBrand = async (data, id) => {
        try {
            let response = await BrandModel.findByIdAndUpdate(id, {
                $set : data
            })
            return response
        } catch (error) {
            throw error
            
        }
    }

    deleteBrandById = async (id) => {
        try {
            let delPrev = await BrandModel.findByIdAndRemove(id)
            return delPrev
        
        } catch (error) {
            throw error
            
        }
    }

    getAllBrand = async () => {
        try {
            const response = await BrandModel.find()
            return response
        } catch (err) {
            throw err
        }
    }

    getById = async (id) => {
        try {
            let brand= await BrandModel.findById(id)
            return brand
        } catch (error) {
            throw error
        }
    }
}

let brandSer = new BrandService();
module.exports = brandSer

