// Node server (Sapp.js)
const express = require('express');
const app = express();
const routes = require('./routes')

app.use(express.json())

app.use('/api/v1' , routes);



app.use((req, res, next)=> {
    next({status: 404, msg: "Page not found"}) //Always calls the error handling middleware
})


// Error handling middleware

app.use((error, req, res, next)=>{
    let status =  error.status || 500
    let msg = error.msg || JSON.stringify(error)
    res.status(status).json({ 
        result : error,
        status : false,
        msg : msg,
        meta : null
    })
})

app.listen(2814, "localhost", (err) => {
    if(!err)
    {
    console.log("Server is listening to the port 2814")
    }
})