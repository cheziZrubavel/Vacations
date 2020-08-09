const express = require("express");
const expressSession = require("express-session");
const vacationsController = require("./controllers/vacations-controller");
const authController = require("./controllers/auth-controller");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
// const controllers = require('require.all')('./controllers');

const server = express();
server.use(express.static("uploads"));
server.use(cors());
server.use(expressSession({
    name: "authenticationCookie",
    secret: "secretData",
    resave: true,
    saveUninitialized: false
}));

server.use(express.json());
// server.use("/api", controllers);
server.use("/api/vacations", vacationsController);
server.use(fileUpload());
server.use("/api/auth", authController);
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

server.listen(3000, () => console.log("Listening on http://localhost:3000"));