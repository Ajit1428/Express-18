const constant = {
    SMTP : {
        HOST : "sandbox.smtp.mailtrap.io",
        PORT : 587,
        USER : "e3dda96ebbfb21",
        PWD : "028937b4f89f3e",
        FROM : "noreply@test.com",
        SECURE : false

    },
    DB: {
        URL: "mongodb://127.0.0.1:27017/express-18",
        NAME: "express-18"
    },
    emailTemps : {
        activation : "<p> Dear user,</p>"+
                     "<p> your account has been created. Please click on the link below to activate your account.<a href = 'https://localhost:2814/activate/:activationToken'> https://localhost:2814/activate/:activationToken</a></p>"+
                     "<p><strong> Regards</strong></p>"+
                     "<p>No reply </p>"+
                     "<p>noreply@test.com</p>"
    },
    ALLOWED_IMAGES: ["jpg", "png", "gif", "jpeg", "webp", "bmp", "svg"],
    JWT_SECRET: "ADMINUSER123"
}


module.exports = constant