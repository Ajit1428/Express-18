const router =  require('express').Router();


router.get('/',(req, res , next) => {
    console.log("I am in home route")
    res.status(200).json({
        result : [],
        message : "You're in the home page",
        status : "200",
        meta : null

    })    
})


router.post('/feedbacks', (req, res, next) => {
    try {
        throw "Content not found"
    } catch (error) {
        next({status: 404, msg: error})
    }
})




module.exports = router;




