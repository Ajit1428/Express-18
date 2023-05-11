const productSer = require("../service/product.service")
const slugify = require('slugify')

class ProductController { 
    createProduct = async (req, res, next) => {
       try {
            let data = req.body
           
            if(req.files){
                let images = []
                req.files.map((image) => {
                    images.push(image.filename)
                })
                data.images = images
            }
          
            if(typeof data.categories !== 'object'){
                data.categories = JSON.parse(data.categories)
                
            }
            else{
                data.categories = null
            }

            if(!data.sellerId || data.sellerId == "null"){
                data.sellerId = null
            }

            if(!data.brand || data.brand == "null"){
                data.brand = null
            }


            data.featured = data.featured == 1 ? true : false

            let validated = await productSer.validateData(data)

            data.actualPrice = data.price - data.price * data.discount / 100
            data.slug = slugify(data.title, {
              lower: true  
            })
            // if(data.parent === 'null' || !data.parent){
            //     data.parent = null;
            // }

            data.createdBy = req.authUser._id
            let response = await productSer.storeProduct(data)

            res.json({
                result: response,
                msg: "Product Created Successfully",
                status: "true",
                meta: null
            })

       } catch (error) {
            next({status: 400, msg: "Error while creating the product"})
            console.log(error)
       }
    }

    listAllProduct = async (req, res, next) => {
        try {
            let response = await productSer.getAllProduct();
            res.json({
                result: response,
                status: true,
                msg: "Fetched data",
                meta: null
            })
        } catch (error) {
            next({status: 400, msg: "Error while listing product"})
        }
    }


    updateProduct = async (req, res, next) => {
        try {
             let data = req.body
             let existingProduct = await productSer.getById(req.params.id)

             if(req.files){
                let images = []
                req.files.map((image) => {
                    images.push(image.filename)
                })
                data.images = images
            }
            else {
                data.images = existingProduct.images
            }
 
           
            if(typeof data.categories !== 'object'){
                data.categories = JSON.parse(data.categories)
                
            }
            else{
                data.categories = null
            }

            if(!data.sellerId || data.sellerId == "null"){
                data.sellerId = null
            }

            if(!data.brand || data.brand == "null"){
                data.brand = null
            }


            data.featured = data.featured == 1 ? true : false

            let validated = await productSer.validateData(data)

            data.actualPrice = data.price - data.price * data.discount / 100
            data.slug = existingProduct.slug
           
            let response = await productSer.updatedProduct(data, req.params.id)

            res.json({
                 result: response,
                 msg: "Product updated Successfully",
                 status: "true",
                 meta: null
             })
 
        } catch (error) {
            console.log(error)
             next({status: 400, msg: "Error while updating the product"})
        }
     }


    deleteProduct = async (req, res, next) => {
        try {
            let delPrev = await productSer.deleteProductById(req.params.id)
            if(delPrev){
            res.json({
                result: delPrev,
                msg: "Product deleted successfully",
                status: true,
                meta: null
            })
        }
        else{
            next({status: 404, msg:"Content does not exist"})
        }
        } catch (error) {
            next({status: 400, msg: "Error while deleting the product"})
        }
    }

    getDetailBySlug = async (req, res, next) => {
        try {
            let detail = await productSer.getProductBySlug(req.params.slug)
            if(detail){
            res.json({
                result: detail,
                status: true,
                msg: "Product detail",
                meta: null
            })
        }
        else{
            next({status: 404, msg:"Product does not exist"})
        }
        } catch (error) {
            next({status: 400, msg: "Error while fetching the details using slug"})

        }
    }

    getActiveProduct = async (req, res, next) => {
        try {
            let allActiveProducts = await productSer.getActiveProducts()
            res.json({
                result: allActiveProducts,
                status: true,
                msg: "All active products"

            })
        } catch (error) {
            next({status: 400, msg: "Error while fetching the active products"})
        }
    }

    }

    

let productCon =  new ProductController();
module.exports = productCon;