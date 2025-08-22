var ImageKit = require("imagekit");
var mongoose = require('mongoose')
var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKI_PUBLIC_KEY,
    privateKey : process.env.IMAGEKI_PRIVATE_KEY ,
    urlEndpoint : process.env.IMAGEKI_URL_ENDPOINT
});

function uploadFile(file){
     return new Promise((resolve, reject)=>{
          imagekit.upload({
               file:file.buffer,
               fileName:new mongoose.Types.ObjectId().toString(),
               folder:"cohort-audio"
          },(error,result)=>{
               if(error){
                    reject(error);
               }
               else{
                    resolve(result);
               }
          }
     )
     });
}

module.exports = uploadFile; 