const SpotifyWebApi = require('spotify-web-api-node');

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri:"https://ironmusic.adaptable.app"
});

  // Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    //.then(data=> spotifyApi.setRefreshToken(data.body['refresh_token']) )
    .catch(error => console.log('Something went wrong when retrieving an access token', error));


module.exports = spotifyApi;