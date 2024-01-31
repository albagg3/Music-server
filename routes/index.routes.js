const {getNewReleases} = require("../utils/autoNewReleases");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  getNewReleases();
  res.json("All good in here");
});

module.exports = router;
