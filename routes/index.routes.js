const {getNewReleases} = require("../utils/autoNewReleases");

const router = require("express").Router();
const Song = require("../models/Post.model");


router.get("/", async(req, res, next) => {
  try{
      const posts = await Song.find().populate('owner');
      console.log(posts);
      res.status(200).json({posts});
  }catch(error) 
  {
    console.log(error);
  }
  // getNewReleases();
});

module.exports = router;
