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

const apiCallforSongData = async(title)=>{
    const song = await spotifyApi.searchTracks(title)
    return song.body.tracks.items;
}

//This function will automatically publish 5 songs with fake users
const getNewReleases = async() =>{
    try {
        const data = await spotifyApi.getNewReleases({ limit: 5, offset: 0 })
        const newReleasesData = data.body.albums.items;
        
        const newReleasesArr = data.body.albums.items;

        const newReleasesNames = newReleasesArr.map((song) => song.name)
        const songsToPublish = await Promise.all(
            newReleasesNames.map(async(title)=>{
            const song = await apiCallforSongData(title)
            return song[0];
        })
        )
        const cleanSongsArr = cleanSongsArrFromApi(songsToPublish);
        console.log(cleanSongsArr)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getNewReleases, cleanSongsArrFromApi}