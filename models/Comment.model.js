const mongoose = require("mongoose")
const { Schema, model} = require("mongoose");

const CommentSchema = new Schema(
    {
        comment: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true
    }
);

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
