const express = require("express");
const authLogic = require("../bll/auth-logic");
const router = express.Router();

router.post("/register", async (request, response) => {
    // Save new user to the database (if username not exist)
    try {
        // Register User
        let firstName = request.body.firstName;
        let lastName = request.body.lastName;
        let username = request.body.username;
        let password = request.body.password;

        if (authLogic.isUsernameAlreadyExist(username) === true) {
            response.status(403).send("username already exists");
        } else {
            const addedUser = await authLogic.registerUser(firstName, lastName, username, password);
            response.status(201).json(addedUser);
        }
    } catch (err) {
        response.status(500).send(err.message);
    }
});


// Login: 
router.post("/login", async (request, response) => {
    try {
        // Check in database if user exist: 
        const username = request.body.username;
        const password = request.body.password;
        const user = await authLogic.isUserExist(username, password);
        if (!user) {
            response.status(403).send("Incorrect username or password");
            return;
        } else {
            // Save in the session that user is logged in, and user's role: 
            request.session.isLoggedIn = true;
            request.session.role = user[0].isAdmin > 0 ? "Admin" : "User";
            response.json(user);
        }
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// Log-out: 
router.post("/logout", (request, response) => {
    try {
        request.session.destroy();
        response.send();
    } catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;