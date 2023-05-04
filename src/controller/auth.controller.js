const userSer = require('../service/user.service')
const bcrypt =  require('bcrypt')
const helpers = require('../../config/helper')
const emailSer = require('../service/email.service')
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require('../../config/constant')

class AuthController {
    login = async (req, res, next) => {
        try {
        let credentials = req.body
        let validate = await userSer.loginValidate(credentials)

        let user = await userSer.getUserByEmail(credentials.email)
        if(!user){
            next({status: 400 , msg: "User does not exist"})
        }

        if(bcrypt.compareSync(credentials.password, user.password)){

            if(user.status === "active"){
            let token = jwt.sign({
                _id: user._id
            }, JWT_SECRET)
            res.json({
                result: {
                    accessToken : token,
                    tokenType: "bearer",
                    userDetails : user
                },
                status: true,
                message: "Welcome to the admin pannel",
                meta: null
            })
        }
        else{
            next({status: 400, msg: "User needs to be active"})
        }
        }
        else
        {
            next({status: 400, msg: "Credentials do not match"})
        }
    }
    catch (err){
        console.log("Login error: ", err)
        next({status : 400 , msg: err})
    }
    }

    register = async (req, res, next) => {
    try 
    {

       let data = req.body;
       let userExists =  await userSer.getUserByEmail(data.email);
       if(userExists){
        next({status: 400, msg: "Email already exists"})
       }

       if(req.file) {
            data.image = req.file.filename;
       }

       data.status = "inactive";
       let validatedData = await userSer.validateUser(data) 
       data.activationToken = helpers.randomString(100);
       validatedData.password = bcrypt.hashSync(validatedData.password, 10);

       req.myEvent.emit("registerEmailSend", data )

       if(validatedData.address && typeof validatedData.address === "string"){
        validatedData.address = JSON.parse(validatedData.address)
       }

       let responseDb = await userSer.registerUser(validatedData);

       res.json({
        result : responseDb,
        status : true,
        message : "User resgisterd",
        meta : null
       })
       
    }
    catch (err) {
        next({status : 400 , msg: err})
    }

    }

    activateUser = (req, res, next) => {
        try {
            let token = req.token

            let user = {
                status: "active"
            }
            res.json({
                result : user,
                status : true,
                msg : 'User activated successfully'
            })
        }
        catch (err) {
            console.log("Activation error: ", err)
            next({status : 400 , msg: err})
        }
    }

    getLoggedinUser = (req, res, next) => {
        res.json({
            result: req.authUser,
            status: true,
            msg: "Your profile",
            meta: null
        })
    }
}



const authCon = new AuthController();
module.exports = authCon;