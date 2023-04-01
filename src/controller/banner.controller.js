const bannerSer = require("../service/banner.service")

class BannerController { 
    createBanner = async (req, res, next) => {
       try {
            let data = req.body
            data.image = req.file.filename

            let validated = await bannerSer.validateData(data)
            data.createdBy = req.authUser._id
            let response = await bannerSer.storeBanner(data)

            res.json({
                result: response,
                msg: "Banner Created Successfully",
                status: "true",
                meta: null
            })

       } catch (error) {
            next({status: 400, msg: "Error while creating the banner"})
       }
    }

    listAllBanner = async (req, res, next) => {
        try {
            let response = await bannerSer.getAllBanner();
            res.json({
                result: response,
                status: true,
                msg: "Fetched data",
                meta: null
            })
        } catch (error) {
            next({status: 400, msg: "Error while listing banner"})
        }
    }


    updateBanner = async (req, res, next) => {
        try {
             let data = req.body
             let existingBanner = await bannerSer.getById(req.params.id)

             if(req.file){
                data.image = req.file.filename
             }
             else{
                data.image = existingBanner.image
             }


             data.image = req.file.filename
 
           
             let response = await bannerSer.updatedBanner(data, req.params.id)
 
             res.json({
                 result: response,
                 msg: "Banner updated Successfully",
                 status: "true",
                 meta: null
             })
 
        } catch (error) {
             next({status: 400, msg: "Error while updating the banner"})
        }
     }


    deleteBanner = async (req, res, next) => {
        try {
            let delPrev = await bannerSer.deleteBannerById(req.params.id)
            if(delPrev){
            res.json({
                result: delPrev,
                msg: "Banner deleted successfully",
                status: true,
                meta: null
            })
        }
        else{
            next({status: 404, msg:"Content does not exist"})
        }
        } catch (error) {
            next({status: 400, msg: "Error while deleting the banner"})
        }
    }

    }

    

let bannerCon =  new BannerController();
module.exports = bannerCon;