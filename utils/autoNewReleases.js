const spotifyApi = require("../api/api")

const cleanSongsArrFromApi = (songsArray) =>{

    const cleanSongsArr = songsArray.map((song) => {
        const obj = {
            name: song.name,
            artist: song.artists[0].name,
            id: song.id,
            preview: song.preview_url,
            imageURL: song.album?.images[1].url
        }
        return obj;
    })
    return cleanSongsArr;
}

//This function will automatically publish 5 songs with fake users
const getNewReleases = async() =>{
    try {
        const data = await spotifyApi.getNewReleases({ limit: 5, offset: 0 })
        const dataSongsToPublished = data.body.albums.items;
        const song = await spotifyApi.searchTracks(dataSongsToPublished[0].name)
        console.log("SONG", song.body.tracks.items)
        // console.log("DATA", data.body.albums.items);
        const cleanSongsArr = cleanSongsArrFromApi(dataSongsToPublished);
        console.log(cleanSongsArr)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getNewReleases, cleanSongsArrFromApi}