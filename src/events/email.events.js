const express = require("express")
const app = express()
const {EventEmitter} = require("events")
const emailSer = require("../service/email.service")

const myEvent = new EventEmitter();
app.use((req, res, next) => {
    req.myEvent = myEvent
    next();
})


myEvent.addListener("registerEmailSend", (data) => {
    emailSer.setSubject("Activate your account");
    emailSer.setMessage("activation", {activationToken: data.activationToken})
    emailSer.sendEmail(data.email)
 
})




module.exports = app