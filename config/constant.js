const constant = {
    SMTP : {
        HOST : "sandbox.smtp.mailtrap.io",
        PORT : 587,
        USER : "e3dda96ebbfb21",
        PWD : "028937b4f89f3e",
        FROM : "noreply@test.com",
        SECURE : false

    },
    emailTemps : {
        activation : "<p> Dear user,</p>"+
                     "<p> your account has been created. Please click on the link below to activate your account.<a href = 'https://localhost:2814/activate/:activationToken'> https://localhost:2814/activate/:activationToken</a></p>"+
                     "<p><strong> Regards</strong></p>"+
                     "<p>No reply </p>"+
                     "<p>noreply@test.com</p>"
    }
}


module.exports = constant