const authMid = (req, res, next) => {
    try {
        let token = null;

        if(req.headers['authorization']){
            token = req.headers['authorization'];
        }

        if(!token){
            next({status : 403, msg: "User token invalid"});
        }

        token = (token.split(" ")).pop();

        if(!token){
            next({status : 403, msg: "User token invalid"});
        }

        
        let details = {
           _id : "123abc",
           name : "test user",
           email : "test@gmail.com",
           role : "admin", 
        }
        if(details){
            req.authUser =  details;
            next()
        }
        else{
            throw "Not logged in";
        }
    } catch (err) {
        console.log("Authentication Error:" ,err);
        next({status: 400, msg: err});
    }
}

module.exports = authMid;