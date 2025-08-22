const express = require('express')
const multer = require('multer');
const uploadFile = require('../service/storage.service');
const router = express.Router();
const songmodel = require("../model/songs")

const upload = multer({storage:multer.memoryStorage()});

router.post('/songs',upload.single("audio"),async (req,res)=>{
     console.log(req.body)
     console.log(req.file)
     const fileData = await uploadFile(req.file);

    const song = await songmodel.create({
     title:req.body.title,
     artist:req.body.artist,
     audio:fileData.url,
     mood:req.body.mood
    })
          res.status(201).json({
               message: 'song created successfully',
               song: song
              
     });
})

router.get('/songs',async (req,res)=>{
     const {mood} = req.query;
     const songs = await songmodel.find({
          mood: mood
     });
     res.status(200).json({
          message:"songs fetched successfully",
          songs
     });
})

 module.exports = router;