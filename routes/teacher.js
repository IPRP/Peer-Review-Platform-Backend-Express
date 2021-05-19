var express = require('express');
var router = express.Router();

var workshops = require("../models/workshops_mock")
var submissions = require("../models/submission_mock")
var usersubmissions = require("../models/user_submissions_mock")
var workshopsubmission = require("../models/workshop_submission_mock")
// var attachments = require("../models/attachment_mock")
// var reviews = require("../models/review_mock")
var users = require("../models/users")

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
        const userLogin = users.login(credentials[0].toLowerCase());
        if ((userLogin >= -1 && credentials[1] === "1234")) {
            // The username and password are correct, so the user is authorized.
            res.locals.user = userLogin;
            next();
        } else {
            // The user typed in the username or password wrong.
            res.status(403).send("Access Denied (incorrect credentials)");
        }
    }
};

// TEACHER ROUTES


//GET All Workshops from teacher
router.get("/workshops", async(req, res) => {

    try {
        await res.status(200).send(workshops.getWorkshopsTeacher(res.locals.user));
    } catch (err) {
        await res.status(500).send(err);
    }
});

//GET Specific Workshop from teacher

router.get("/workshop/:id", async(req, res) => {

    try {
        let r = workshops.getWorkshopTeacher(res.locals.user, req.params.id)
        var subIds = workshopsubmission.getSubmissionIds(req.params.id);
        var subs = []
        // var revs = []
        subIds.forEach(si => {
            console.log("userrsub")
            console.log(submissions.getSubmissionMitUser(si.submissionid, usersubmissions.getUserFromSubmission(si.submissionid)[0]))
            subs.push(submissions.getSubmissionMitUser(si.submissionid, usersubmissions.getUserFromSubmission(si.submissionid)[0]))
            // revs.push(submissions.getReviews(si.submissionid))
        })

        var realresult = []
        // result.forEach(r => {
            realresult.push({
                ok: true,
                workshop: {
                    title: r.title,
                    content: r.content,
                    end: r.end,
                    teachers: r.teachers,
                    students: r.students,
                    submissions: subs,
                    // reviews: revs

                }
            })
        // })
        res.send(realresult[0]);

        // await res.status(200).send(workshops.getWorkshopTeacher(res.locals.user, req.params.id));
    } catch (err) {
        await res.status(500).send(err);
    }
});

//POST Create new Workshop

router.post("/workshop", async(req, res) => {
    try {
        await res.status(200).send(workshops.createWorkshop(req.body));
    } catch (err) {
        await res.status(500).send(err);
    }
});

//PUT Update specific Workshop

router.put("/workshop/:id", async(req, res) => {
    try {
        await res.status(200).send(workshops.editWorkshop(req.params.id, req.body));
    } catch (err) {
        await res.status(500).send(err);
    }
});

//DELETE Specific Workshop

router.delete("/workshop/:id", async(req, res) => {
    try {
        await res.status(200).send(workshops.deleteWorkshop(req.params.id));
    } catch (err) {
        await res.status(500).send(err);
    }
});

//GET Student ID From Name OR GET all students from group

router.get("/search/student", async(req, res) => {
    if (req.query.group == undefined && req.query.id == undefined) {
        try {
            await res.status(200).send(users.searchStudents(req.query.firstname, req.query.lastname));
        } catch (err) {
            await res.status(500).send(err);
        }
    } else if (req.query.id != undefined) {
        try {
            await res.status(200).send(users.searchStudentsID(req.query.id));
        } catch (err) {
            await res.status(500).send(err);
        }
    } else {
        try {
            await res.status(200).send(users.searchStudentsGroup(req.query.group));
        } catch (err) {
            await res.status(500).send(err);
        }
    }

});


module.exports = router;