const mongoose = require('mongoose');


function connectDB(){

     mongoose.connect(process.env.MONGODB_URL)
     .then(()=>{
          console.log("connected to db")
     })
     .catch((err)=>{
          console.error('Error connecting to MongoDB', err)
     })
     

}

module.exports = connectDB;