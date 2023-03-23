const userSer = require('../service/user.service')
const bcrypt =  require('bcrypt')
const helpers = require('../../config/helper')
const nodemailer = require('nodemailer')
const emailSer = require('../service/email.service')

class AuthController {
    login = (req, res, next) => {
        try {
       
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
       if(req.file) {
        console.log(req.file)
       }
       data.status = "inactive";
       let validatedData = await userSer.validateUser(data) 
       data.activationToken = helpers.randomString(100);
       validatedData.password = bcrypt.hashSync(validatedData.password, 10);

       emailSer.setSubject("Activate your account");
       emailSer.setMessage("activation", {activationToken: data.activationToken})
       emailSer.sendEmail(validatedData.email)

       res.json({
        result : validatedData,
        status : true,
        message : "User resgisterd",
        meta : null
       })
       
    }
    catch (err) {
        console.log("Registration error: ", err)
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
}



const authCon = new AuthController();
module.exports = authCon;