const spotifyApi = require("../api/api")

//This function will automatically publish 5 songs with fake users
const getNewReleases = async() =>{
    try {
        const data = await spotifyApi.getNewReleases({ limit: 5, offset: 0 })
        const dataSongsToPublished = data.body.albums.items;
        console.log("DATA", data.body.albums.items);
        res.status(200).send({ songs: dataSongsToPublished });

    } catch (error) {
        console.log(error);
    }
}

module.exports = getNewReleases