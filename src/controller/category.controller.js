const categorySer = require("../service/category.service")
const slugify = require('slugify')

class CategoryController { 
    createCategory = async (req, res, next) => {
       try {
            let data = req.body
            data.image = req.file.filename

            let validated = await categorySer.validateData(data)

            data.slug = slugify(data.title, {
              lower: true  
            })
            if(data.parent === 'null' || !data.parent){
                data.parent = null;
            }

            data.createdBy = req.authUser._id
            let response = await categorySer.storeCategory(data)

            res.json({
                result: response,
                msg: "Category Created Successfully",
                status: "true",
                meta: null
            })

       } catch (error) {
            next({status: 400, msg: "Error while creating the category"})
       }
    }

    listAllCategory = async (req, res, next) => {
        try {
            let response = await categorySer.getAllCategory();
            res.json({
                result: response,
                status: true,
                msg: "Fetched data",
                meta: null
            })
        } catch (error) {
            next({status: 400, msg: "Error while listing category"})
        }
    }


    updateCategory = async (req, res, next) => {
        try {
             let data = req.body
             let existingCategory = await categorySer.getById(req.params.id)

             if(req.file){
                data.image = req.file.filename
             }
             else{
                data.image = existingCategory.image
             }

             if(data.parent === 'null' || !data.parent){
                data.parent = null;
            }
 
           
             let response = await categorySer.updatedCategory(data, req.params.id)
 
             res.json({
                 result: response,
                 msg: "Category updated Successfully",
                 status: "true",
                 meta: null
             })
 
        } catch (error) {
             next({status: 400, msg: "Error while updating the category"})
        }
     }


    deleteCategory = async (req, res, next) => {
        try {
            let delPrev = await categorySer.deleteCategoryById(req.params.id)
            if(delPrev){
            res.json({
                result: delPrev,
                msg: "Category deleted successfully",
                status: true,
                meta: null
            })
        }
        else{
            next({status: 404, msg:"Content does not exist"})
        }
        } catch (error) {
            next({status: 400, msg: "Error while deleting the category"})
        }
    }

    getDetailBySlug = async (req, res, next) => {
        try {
            let detail = await categorySer.getCategoryBySlug(req.params.slug)
            res.json({
                result: detail,
                status: true,
                msg: "Category detail",
                meta: null
            })
            
        } catch (error) {
            next({status: 400, msg: "Error while fetching the details using slug"})

        }
    }

    }

    

let categoryCon =  new CategoryController();
module.exports = categoryCon;