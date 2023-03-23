const router = require('express').Router();
const authCon = require('../src/controller/auth.controller')
const multer = require('multer')


const myStorage = multer.diskStorage({
    destination: (req, file, next) => {
        let path = 'public/uploads'
        next(false, path)
    },
    filename: (req, file, next) =>{
        next(false, file.originalname)
    }
}) 

const uploader = multer({
    storage: myStorage
})

router.post('/login', authCon.login )

router.post('/register', uploader.single('image'), authCon.register )

router.get('activate/:token', authCon.activateUser)


module.exports = router;