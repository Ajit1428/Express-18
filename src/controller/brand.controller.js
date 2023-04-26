const brandSer = require("../service/brand.service")
const slugify = require('slugify')

class BrandController { 
    createBrand = async (req, res, next) => {
       try {
            let data = req.body
            data.image = req.file.filename

            let validated = await brandSer.validateData(data)

            data.slug = slugify(data.title, {
              lower: true  
            })

            data.createdBy = req.authUser._id
            let response = await brandSer.storeBrand(data)

            res.json({
                result: response,
                msg: "Brand Created Successfully",
                status: "true",
                meta: null
            })

       } catch (error) {
            next({status: 400, msg: "Error while creating the brand"})
       }
    }

    listAllBrand = async (req, res, next) => {
        try {
            let response = await brandSer.getAllBrand();
            res.json({
                result: response,
                status: true,
                msg: "Fetched data",
                meta: null
            })
        } catch (error) {
            next({status: 400, msg: "Error while listing brand"})
        }
    }


    updateBrand = async (req, res, next) => {
        try {
             let data = req.body
             let existingBrand = await brandSer.getById(req.params.id)

             if(req.file){
                data.image = req.file.filename
             }
             else{
                data.image = existingBrand.image
             }


             data.image = req.file.filename
 
           
             let response = await brandSer.updatedBrand(data, req.params.id)
 
             res.json({
                 result: response,
                 msg: "Brand updated Successfully",
                 status: "true",
                 meta: null
             })
 
        } catch (error) {
             next({status: 400, msg: "Error while updating the brand"})
        }
     }


    deleteBrand = async (req, res, next) => {
        try {
            let delPrev = await brandSer.deleteBrandById(req.params.id)
            if(delPrev){
            res.json({
                result: delPrev,
                msg: "Brand deleted successfully",
                status: true,
                meta: null
            })
        }
        else{
            next({status: 404, msg:"Content does not exist"})
        }
        } catch (error) {
            next({status: 400, msg: "Error while deleting the brand"})
        }
    }

    }

    

let brandCon =  new BrandController();
module.exports = brandCon;