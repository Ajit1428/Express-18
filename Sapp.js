// Node server (Sapp.js)
const express = require('express');
const app = express();
const routes = require('./routes')



app.use('/api/v1' , routes);


app.listen(2814, "localhost", (err) => {
    if(!err)
    {
    console.log("Server is listening to the port 2814")
    }
})