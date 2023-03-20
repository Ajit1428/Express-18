class UserController {
    create = (req, res, next)=> {
    try    
       { 
        res.json({
            result : req.authUser,
            status : true,
            message : "You have logged in",
            meta : null
        })
    }
    catch(err)
    {
        console.log("CreateUser : ", err)
        next({status : 400, msg: err})
    }
    }

    index = (req, res, next)=> {
        try 
        {
            
        } 
        catch (err) 
        {
            console.log("UserIndex: ", err)
            next({status : 400, msg: err})
        }
    }

    show = (req, res, next)=> {
        try 
        {
            
        } 
        catch (err) 
        {
            console.log("UserShow: ", err)
            next({status : 400, msg: err})
        }
    }
    update = (req, res, next)=> {
        try 
        {
            
        } 
        catch (err) 
        {
            console.log("UpdateUser: ", err)
            next({status : 400, msg: err})
        }
    }
    delete = (req, res, next)=> {
        try 
        {
            
        } 
        catch (err) 
        {
            console.log("DeleteUser: ", err)
            next({status : 400, msg: err})
        }
    }
}

let userCon = new UserController();
module.exports = userCon;