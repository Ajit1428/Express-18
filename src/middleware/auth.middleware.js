const jwt =  require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/constant');
const userSer = require('../service/user.service');
const authMid = async (req, res, next) => {
    try {
        let token = null;

        if(req.headers['authorization']){
            token = req.headers['authorization'];
        }

        if(!token){
            next({status : 401, msg: "User not logged in"});
        }

        token = (token.split(" ")).pop();

        if(!token){
            next({status : 401, msg: "User not logged in"});
        }

        
        let data = jwt.verify(token, JWT_SECRET)
        if(!data){
            next({status: 400, msg: "Invalid token"})
        }
        else
        {
            let userId = data._id;
            let userDetails = await userSer.getUserById(userId)
            if(!userDetails)
            {
                next({status: 401, msg: "Token does not exist"})
            }
            else
            {
                req.authUser = userDetails
                next();

            }
        }
    } catch (err) {
        console.log("Authentication Error:" ,err);
        next({status: 400, msg: err});
    }
}

module.exports = authMid;