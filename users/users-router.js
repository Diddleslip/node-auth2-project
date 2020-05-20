const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const User = require("./users-model");
const restricted = require("../auth/restricted-middleware");
const { isValid, logIn } = require("./users-service");

// router.use(restricted); USE THIS IF YOU WISH ALL THE COMMANDS BELOW TO FOLLOW THIS!

router.get("/", restricted, (req, res) => {
    
    User.find()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ message: error.message });
    })
})

router.get("/:department", restricted, (req, res) => {
    const {department} = req.params;

    User.findByDepartment(department)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ message: error.message });
    })
})

router.get("/:id/id", restricted, (req, res) => {
    const {id} = req.params;

    User.findById(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ message: error.message });
    })
})

router.post("/register", (req, res) => {
    const user = req.body;

    if(isValid(user)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        //Hash the password
        const hash = bcryptjs.hashSync(user.password, rounds)

        user.password = hash;

        // Save the user to the database
        User.add(user)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })

    } else {
        res.status(400).json({ message: "Please enter a valid username, password and department." });
    }
})

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    if(logIn(req.body)) {
        User.findBy({username: username})
        .then(([response]) => {
            // res.json(response);

            // Compare the password the hash stored in the database
            if(response && bcryptjs.compareSync(password, response.password)) {
                // Produce and send a token that includes the username and the role of the user
                const token = createToken(response);

                res.status(200).json({ message: "Welcome to our API", token });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
    } else {
        res.status(400).json({ message: "Please enter a valid username, and password." });
    }
})

function createToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        department: user.department
    };

    const secret = process.env.JWT_SECRET || "this is my secret, and mine only";

    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, secret, options);
} 

module.exports = router;