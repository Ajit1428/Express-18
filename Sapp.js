// Node server (Sapp.js)
const express = require('express');
const { MulterError } = require('multer');
const cors = require('cors')


require('./config/db.config')

const app = express();

const routes = require('./routes')

app.use(cors())

const emailEvent = require("./src/events/email.events")
app.use(emailEvent)


app.use(express.json())

app.use("/images", express.static(process.cwd()+ "/public/images"))

app.use('/api/v1' , routes);

app.use((req, res, next)=> {
    next({status: 404, msg: "Page not found"}) //Always calls the error handling middleware
})

// Error handling middleware

app.use((error, req, res, next)=>{
    let status =  error.status || 500
    let msg = error.msg || JSON.stringify(error)


    if(error instanceof MulterError){
        status = 400;
        msg = error.message;
    }

    res.status(status).json({ 
        result : error,
        status : false,
        msg : msg,
        meta : null
    })
})

app.listen(process.env.PORT || 80,(err) => {
    if(!err)
    {
    console.log("Server is listening to the port 2814")
    }
})