const userSer = require('../service/user.service')
const bcrypt =  require('bcrypt')

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
       let validatedData = await userSer.validateUser(data) 
       
       validatedData.password = bcrypt.hashSync(validatedData.password, 10);

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
}



const authCon = new AuthController();
module.exports = authCon;