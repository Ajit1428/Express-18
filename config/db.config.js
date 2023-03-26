const mongoose = require('mongoose');
const { DB } = require('./constant');

mongoose.connect(DB.URL, {
    autoCreate : true,
    autoIndex: true
}).then(() => {
    console.log("DataBase connected successfully")
}).catch((err)=> {
    console.log("Error while connecting to the database")
})