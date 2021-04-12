var express = require('express');
var router = express.Router();

var workshops = require("../models/workshops_mock")
var submissions = require("../models/submission_mock")
var usersubmissions = require("../models/user_submissions_mock")
var workshopsubmission = require("../models/workshop_submission_mock")

//BasicAuth middleware injection
router.use(user);


function user(req, res, next) {
    const auth = req.get("authorization");
    /*
    On the first request, the "Authorization" header won't exist, so we'll set a Response
    header that prompts the browser to ask for a username and password.*/
    if (!auth) {
        res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
        // If the user cancels the dialog, or enters the password wrong too many times,
        // show the Access Restricted error message.
        res.status(401).send("Authorization Required");
    } else {
        // If the user enters a username and password, the browser re-requests the route
        // and includes a Base64 string of those credentials.
        const credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");
        if ((credentials[0] === "georg" && credentials[1] === "1234") || (credentials[0] === "lukas" && credentials[1] === "1234") || (credentials[0] === "thomas" && credentials[1] === "1234") || (credentials[0] === "lukasb" && credentials[1] === "1234") || (credentials[0] === "kacper" && credentials[1] === "1234")) {
            // The username and password are correct, so the user is authorized.
            res.locals.user = credentials[0];
            next();
        } else {
            // The user typed in the username or password wrong.
            res.status(403).send("Access Denied (incorrect credentials)");
        }
    }
};

// TEACHER ROUTES

router.get("/workshops", (req, res) => {
    res.send(workshops.getWorkshopsTeacher(res.locals.user));
    /*
        try {
            res.status(200).send(workshops.getWorkshopsTeacher("lukas"));
        } catch (err) {
            res.status(500).send(err);
        }*/
})

module.exports = router;