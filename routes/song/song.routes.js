const router = require("express").Router();

const Song = require("../../models/Post.model");
const User = require("../../models/User.model");

const { default: mongoose } = require("mongoose");
const { isAuthenticated } = require("../../middlewares/jwt.isAuthenticated");
const spotifyApi = require("../../api/api");
const { cleanSongsArrFromApi } = require("../../utils/autoNewReleases")

router.post("/createSong", isAuthenticated, async (req, res, next) => {
    const { title, artist, imageURL, previewURI } = req.body;
    console.log("REQPAYLOAD: ", req.payload);
    const { email } = req.payload

    const owner = await User.find({ email: email })
    const song = {
        title,
        artist,
        imageURL,
        previewURI,
        owner: owner[0]._id
    }
    try {
        songCreated = await Song.create(song)
        // console.log(songCreated);
        res.status(200).json({ song: songCreated })
    }
    catch (error) {
        console.log(error);
    }

})

//This route returns an array of 20 songs depending on the query
router.get("/searchSong", isAuthenticated ,async (req, res, next) => {
    const song = req.query.song;
    try {
        const response = await spotifyApi.searchTracks(song)
        const songsArray = response.body.tracks.items;
        console.log(songsArray);
        const cleanSongsArr = cleanSongsArrFromApi(songsArray)
        res.status(200).json({"songs":cleanSongsArr})
    } catch (error) {
        res.status(500).send("something went wrong")
        console.log(error);
    }

})

//Delete song
router.post("/deleteSong", isAuthenticated, async(req, res, next)=>{
    const song = req.query.song;
    const id = req.payload._id
    try{
        const objectId = new mongoose.Types.ObjectId(id)
        const deletedSong = await Song.findOneAndDelete({ title: song, owner:objectId})
        if(!deletedSong)
            console.log("That user don't have that song")
        res.status(200).json({message: "Song deleted"});
    }catch(error){
        console.log(error)
    }
})

router.post("/addScore", isAuthenticated, async(req, res, next)=>{
    const {score, song} =  req.query;
    const id = req.payload._id
    {
        try{
            const objectId = new mongoose.Types.ObjectId(id)
            const post = await Song.findOne({title:song , owner:objectId})
            const updatedScore = post.score + parseInt(score);
            const updatedSong = await Song.findOneAndUpdate({ title: song, owner:objectId},{score : updatedScore},{new:true})
            if(!updatedSong)
                console.log("That user don't have that song")
        }catch(error){
            console.log("There was an error updating the score")
        }        
    }
})


module.exports = router;