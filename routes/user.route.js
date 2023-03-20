const router = require('express').Router();

router.post('/',(req, res, next)=> {

})

router.get('/',(req, res, next)=> {

})

router.get('/:id', (req, res, next)=> {
    let para =  req.params.id
    let qu =  req.query

    res.json({
        params : para,
        query : qu
    })
})





module.exports =  router