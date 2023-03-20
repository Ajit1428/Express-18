const router = require('express').Router();

router.post('/login', (req, res, next) => {
    res.json({
        message: "Hello i am in auth"
    })
})

router.post('/register', (req, res, next) => {

})


module.exports = router;