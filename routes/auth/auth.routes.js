const router = require("express").Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const User = require("../../models/User.model");
const isValidInput = require("../../middlewares/isValidInput");
const { default: mongoose } = require("mongoose");
const { isAuthenticated } = require("../../middlewares/jwt.isAuthenticated");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

router.post("/signup", isValidInput, async (req, res, next) => {

    const { email, password, userName } = req.body;
    const foundUser = await User.find({ email });
    if (foundUser.length !== 0) {
        res.status(400).json({ message: "The user is already registered, please log in" })
    }
    else {
        try {
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt);
            const userCreated = await User.create({ userName, email, password: hashedPassword });
            res.status(200).json({ message: "User created!" })
        }
        catch (error) {
            if (error instanceof mongoose.Error.ValidationError)
                res.status(400).json({ "message": "Please check your input and try again" })
            else
                res.status(500).json({ "message": "Internal server Error, Try again later" })
        }
    }

});

//Verify email and password y and returns a JWT
router.post("/login", async (req, res, next) => {
    console.log("LOGIN", req.body)
    // res.json("This is the login");
    const { email, password } = req.body;
    if (email === "" || password === "") {
        res.status(400).json({ message: "Provide email and password" })
    }
    else {
        try {
            const userFounded = await User.findOne({ email })
            if (userFounded) {

                const passwordCorrect = bcrypt.compareSync(password, userFounded.password)
                if (passwordCorrect) {
                    const { _id, email, userName } = userFounded;
                
                    // Create an object that will be set as the token payload
                    const payload = { _id, email, userName };

                    // Create a JSON Web Token and sign it
                    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                        algorithm: "HS256",
                        expiresIn: "6h",
                    });

                    // Send the token as the response
                    res.status(200).json({ authToken: authToken });
                }
                else{
                    res.status(401).json({message:"Unable to authenticate the user"})
                }
            }
            else {
                res.status(400).json({ message: "User not found" })
            }
        }
        catch (error) {
            if (error instanceof mongoose.Error.ValidationError)
                res.status(400).json({ "message": "Please check your input and try again" })
            else
                res.status(500).json({ "message": "Internal server Error, Try again later" })
        }
    }
});

router.get("/verify", isAuthenticated,(req, res, next)=>{
    console.log("payload",req.payload)
    res.status(200).json(req.payload)
})



module.exports = router;
