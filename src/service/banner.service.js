const Joi = require("joi")
const BannerModel = require("../model/banner.model")

class BannerService { 
    validateData = async (data) => {
        try{
        const validate = Joi.object({
            title: Joi.string().min(3).required(),
            link: Joi.string().empty(),
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

    storeBanner = async (data) => {
        try {
            let banner = new BannerModel(data);
            return await banner.save()

        } catch (err) {
            throw err
        }
    }

    updatedBanner = async (data, id) => {
        try {
            let response = await BannerModel.findByIdAndUpdate(id, {
                $set : data
            })
            return response
        } catch (error) {
            throw error
            
        }
    }

    deleteBannerById = async (id) => {
        try {
            let delPrev = await BannerModel.findByIdAndRemove(id)
            return delPrev
        
        } catch (error) {
            throw error
            
        }
    }

    getAllBanner = async (pagination) => {
        try {
            let skip = (pagination.currentPage - 1) * pagination.perPage
            const response = await BannerModel.find()
                .skip(skip)
                .limit(pagination.perPage)
            return response
        } catch (err) {
            throw err
        }
    }

    getById = async (id) => {
        try {
            let banner= await BannerModel.findById(id)
            return banner
        } catch (error) {
            throw error
        }
    }

    getTotalPagination = async (perPage, currentPage) => {
        let total = await BannerModel.count();
        return {
            total : total,
            perPage: perPage,
            currentPage: currentPage
        }

    }
}

let bannerSer = new BannerService();
module.exports = bannerSer

