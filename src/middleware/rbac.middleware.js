//Role base access controll

const isAdmin = (req, res, next) => {
    if(req.authUser.role === "admin") {
        next();
    }
    else{
        next({status : 403 , msg: "Only Admin can authorize this page."})
    }
}

const isCustomer = (req, res, next) => {
    if(req.authUser.role === "customer") {
        next();
    }
    else{
        next({status : 403 , msg: "Access Denied"})
    }
}

const isAdminSeller = (req, res, next) => {
    if(req.authUser.role === "seller" || req.authUser.role === "admin" ) {
        next();
    }
    else{
        next({status : 403 , msg: "Access Denied"})
    }
}



module.exports = {isAdmin , isCustomer, isAdminSeller}