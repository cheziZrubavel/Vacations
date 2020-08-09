const express = require("express");
const router = express.Router();
const vacationLogic = require("../bll/vacation-logic");
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });
var authcontroller = require("./auth-controller");
const expressSession = require("express-session");
router.use(expressSession({
    name: "authenticationCookie",
    secret: "secretData",
    resave: true,
    saveUninitialized: false
}));

// Route accessed for everyone:
router.get("/all-vacations", authcontroller,async (request, response) => {
    try {
        console.log(request.session.role);
        const vacations = await vacationLogic.getAllVacations();
        response.json(vacations);
    } catch (err) {
        response.status(500).send(err.message);
    }
})

// Route accessed only for the admin:
router.post("/", upload.single('uploadImage') ,async (request, response) => {
    try {
        // // If user isn't admin: 
        // console.log(request.session.role);
        // if (request.session.role !== "Admin") {
        //     response.status(403).send("Access Denied! You are not Admin!");
        //     return;
        // }
        console.log(request.file.filename);
        console.log(request.body);
        const addedVacation = await vacationLogic.addVacation(request.body, request.file.filename);
        response.status(201).json(addedVacation);
    } catch (err) {
        console.log(err.message);
        response.status(500).send(err.message);
    }
});

// Route accessed only for the admin:
router.put("/:id", upload.single('uploadImage') ,async (request, response) => {
    try {
        // If user isn't admin: 
        // console.log(request.session.role);
        // if (request.session.role !== "Admin") {
        //     response.status(403).send("Access Denied! You are not Admin!");
        //     return;
        // }
        console.log(request.body);
        console.log(request.file);
        const id = +request.params.id;
        const vacation = request.body;
        vacation.id = id;

        const updatedVacation = await vacationLogic.updateVacation(vacation, request.file.filename);
        if (updatedVacation === null) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedVacation);
    } catch (err) {
        response.status(500).send(err.message);
        console.log(err.message);
    }
});

// Route accessed only for the admin:
router.delete("/delete-vacation/:id", async (request, response) => {
    try {
        // If user isn't admin: 
        // console.log(request.session.role);
        // if (request.session.role !== "Admin") {
        //     response.status(403).send("Access Denied! You are not Admin!");
        //     return;
        // }
        const id = +request.params.id;
        await vacationLogic.deleteVacation(id);
        response.sendStatus(201);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// Route only for users:
router.post("/user-follow-on-vacation", async (request, response) => {
    try {
        const userId = +request.body.userId;
        const vacationId = request.body.vacationId;
        vacationLogic.isFollowExist(userId, vacationId)
            .then(booleanRes => {
                if (booleanRes === true) {
                    response.status(403).send("You already follow on this vacation!");
                } else {
                    vacationLogic.userFollowOnVacation(userId, vacationId)
                        .then(() => {
                            response.status(201).send("Follow has been added.");
                        })
                }
            })
            .catch(e => e.message);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// Route accessed for users:
router.get("/amount-followers-on-vacation/", async (request, response) => {
    try {
        const amountFollowers = await vacationLogic.getAmountFollowersOnVacation();
        response.json(amountFollowers);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;