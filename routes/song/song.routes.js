const router = require("express").Router();

const Song = require("../../models/Post.model");
const User = require("../../models/User.model");

const { default: mongoose } = require("mongoose");
const { isAuthenticated } = require("../../middlewares/jwt.isAuthenticated");
const spotifyApi = require("../../api/api");

router.post("/createSong", isAuthenticated, async (req, res, next) => {
    const { title, artist, imageURL, previewURI } = req.body;
    console.log("REQPAYLOAD: ", req.payload.email);
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

        const cleanSongsArr = songsArray.map((song) => {
            const obj = {
                name: song.name,
                artist: song.artists[0].name,
                id: song.id,
                preview: song.preview_url,
                imageURL: song.album.images[1].url
            }
            return obj;
        })
        res.status(200).json({"songs":cleanSongsArr})
    } catch (error) {
        res.status(500).send("something went wrong")
        console.log(error);
    }

})

//This route will automatically publish 5 songs with fake users
router.get("/newReleases", async (req, res, next) => {
    try {
        const data = await spotifyApi.getNewReleases({ limit: 5, offset: 0 })
        const dataSongsToPublished = data.body.albums.items;
        console.log("DATA", data.body.albums.items);
        res.status(200).send({ songs: dataSongsToPublished });

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;