const router =  require('express').Router();


router.get('/',(req, res , next) => {
    console.log("I am in home route")
    res.json({
        result : [],
        message : "You're in home page",
        status : "200",
        meta : null

    })    
})


router.post('/feedbacks', (req, res, next) => {

})




module.exports = router;




