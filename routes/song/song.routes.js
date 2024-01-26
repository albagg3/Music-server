const router = require("express").Router();

const Song = require("../../models/Song.model");
const User = require("../../models/User.model");

const { default: mongoose } = require("mongoose");
const { isAuthenticated } = require("../../middlewares/jwt.isAuthenticated");

router.post("/createSong",isAuthenticated ,async(req, res, next)=>{
    const {title, artist, imgURL, previewURI} = req.body;
    console.log("REQPAYLOAD: ",req.payload.email);
    const {email} = req.payload

    const owner = await User.find({email: email})
    console.log(owner);
    const song = {
        // title: req.body.title,
        // artist: req.body.artist,
        // previewURI: req.body.title,

        title: "test",
        artist:"testartist",
        previewURI:"not available",
        owner:owner._id

    }
    try{
        // console.log("hola");
        songCreated = await Song.create(song)
        // console.log(songCreated);
        res.status(200).json({song: songCreated})

    }
    catch(error){
        console.log(error);
    }

})

module.exports = router;