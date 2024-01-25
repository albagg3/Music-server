const isValidInput = (req,res,next) =>
{
    const { email, password, userName } = req.body;
    console.log(req.body);
    console.log(Object.keys(req.body).length)
    // Check if email or password or name are provided as empty strings
    if (email === "" || password === "" || userName === "") {
        res.status(400).json({ message: "Provide email, password and name" });
        return;
    }

    // This regular expression check that the email is of a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." });
        return;
    }

    // This regular expression checks password for special characters and minimum length
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({
            message:
                "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
        });
        return;
    }
    next();
}


module.exports = isValidInput;