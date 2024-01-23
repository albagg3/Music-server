const router = require("express").Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

router.post("/signin", (req, res, next) =>{
    
    res.json("This is the signin");
});

//Verify email and password y and returns a JWT
router.post("/login", (req,res,next)=>{
    console.log("LOGIN",req.body)
    // res.json("This is the login");
    const {userName , password} = req.body;
    if(userName === "" || password === "")
    {
        res.status(400).json({message:"Provide email and password"})
    }
    else
    {
        console.log(req.headers)
    }
});



module.exports = router;
