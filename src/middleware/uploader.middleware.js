const multer = require('multer')
const helpers =  require('../../config/helper')
const { ALLOWED_IMAGES } = require('../../config/constant');


const myStorage = multer.diskStorage({
    destination: (req, file, next) => {
        let path = 'public/uploads'
        next(false, path)
    },
    filename: (req, file, next) =>{
        //let time = Date.now()+ "-" +file.originalname

        let ext = (file.originalname.split('.')).pop()
        let name = helpers.randomString(5).toLowerCase() + "." + ext
        next(false, name)
    }
}) 

const imageFilter = (req, file, next) => {
    let ext = (file.originalname.split('.')).pop()
    if(ALLOWED_IMAGES.includes(ext.toLowerCase())){
        next(false, true)
    }
    else{
        next({status : 400 , msg: "Invalid file format"})
    }
}

const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits:{
        fileSize : 2000000
    }
})

module.exports = uploader
