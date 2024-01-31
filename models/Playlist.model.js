const mongoose = require("mongoose")
const { Schema, model} = require("mongoose");

const PlaylistSchema = new Schema(
    {
        title: String,
        artist: String,
        imageURL:{
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoparmexnl.org.mx%2Fimgtest%2F&psig=AOvVaw0oEIhNoU4jVQ2dybq0q9Rp&ust=1706367635231000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDaz_Ko-4MDFQAAAAAdAAAAABAE",
        } ,
        previewURI: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        score: {
            type: Number,
            default: 0
        },
        alreadyVoted: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],       
    },
    {
        timestamps: true
    }
);

const Playlist = model("Playlist", PlaylistSchema);

module.exports = Playlist;
