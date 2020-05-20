const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Add code here to verify users are logged in
    const token = req.headers.authorization;

    if(token) {
        const secret = process.env.JWT_SECRET || "this is my secret, and mine only";

        jwt.verify(token, secret, (error, decodedToken) => {
            if(error) {
                // The token is invalid
                res.status(401).json({message: "You cannot pass!" });
            } else {
                // The token is valid
                req.jwt = decodedToken;

                next();
            }
        })
    } else {
        res.status(400).json({ message: "Please provide the authentication information" });
    }
};