var express = require('express');
var router = express.Router();

var workshops = require("../models/workshops_mock")
var submissions = require("../models/submission_mock")
var usersubmissions = require("../models/user_submissions_mock")
var workshopsubmission = require("../models/workshop_submission_mock")
var attachments = require("../models/attachment_mock")
var reviews = require("../models/review_mock")
var users = require("../models/users")

//BasicAuth middleware injection
router.use(user);
/*


ALLGEMEIN


 */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/submission/:id', function(req, res, next) {
    let sendSub = submissions.getOnlyOwnSubmission(req.params.id, usersubmissions.getSubmissionIdFromUser(res.locals.user));

    if (sendSub == undefined) {
        res.status(404).send("Submission wurde nicht gefunden!")
    }
    res.send(sendSub);
});

router.post('/submission/:id', function(req, res, next) {
    //ID
    let subs = submissions.getAll();
    let sublength = subs.length - 1;
    let newID = subs[sublength].id + 1;
    //Datum
    let datetime = getCurrentDate();
    //Points
    let workshop = workshops.getWorkshopStudent(res.locals.user, req.params.id)[0];
    let students = workshop.students;
    let criteria = workshop.criteria;
    var maxpoints = 0;
    criteria.forEach(c => {
        let type = c.type;
        let weight = c.weight;
        if (type == "point") {
            maxpoints += weight * 10;
        } else {
            maxpoints += weight
        }
    });
    //Submission erstellen
    submissions.addSubmission(workshop, true, req.body.title, req.body.comment, req.body.attachments, false, datetime, false, 0, maxpoints, [], newID)
    //Submission mit user verknüpfen
    usersubmissions.add(res.locals.user, newID);
    //Submission mit Workshop verknüpfen
    workshopsubmission.add(workshop.id, newID);
    //Erstelle leeres Review für jeden student
    students.forEach(stu => {
        submissions.addReview(newID, stu, stu, "", [], reviews.addReview({
            feedback: "",
            points: [],
            firstname: stu,
            lastname: stu,
        }));
    })
    
    
    
    res.send({ ok: true });
});

router.put('/submission/:id', function(req, res, next) {
    if (setSub(req.params.id, res.locals.user, req.body.title, req.body.comment, req.body.attachments)) {
        res.send({ ok: true });
    } else {
        res.status(404).send("Submission nicht vorhanden für den User: " + req.locals.user);
    }
});

function setSub(subid, user, title, comment, attachments) {
    var sub = submissions.getOnlyOwnSubmission(subid, user);
    if (sub == undefined) {
        return false;
        res.status(404).send("Submission nicht vorhanden für den User: " + user);
    } else {
        sub[0].title = title;
        sub[0].comment = comment;
        sub[0].attachments = attachments;
        sub[0].date = getCurrentDate();
        submissions.setSubmission(subid, sub);

        return true;
        res.send({ ok: true });
    }
}

router.post('/upload/', function(req, res, next) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.upload;
    uploadPath = __dirname + '/uploads/' + res.locals.user + '/' + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);

        var newID = attachments.addAttachment(sampleFile.name);
        if(newID) {
            res.send({
                ok: true,
                attachment: {
                    id: newID,
                    title: sampleFile.name
                }
            })
        }else{
            return res.status(500).send("Add Attachment error");
        }
    });
});

router.delete('/submission/remove/:id', function (req, res, next) {
    let subid = -1;
    let attid = req.params.id;

    let subs = submissions.getAll();
    subs.forEach(sus => {
        sus.attachments.forEach(atts => {
            if(atts.id == attid){
                subid = sus.id;
            }
        })
    })

    if(subid == -1)
        res.status(404).send("Submission mit diesem Attachment wurde nicht gefunden. Bitte zuerst die Submission updaten und dort die Attachment id hinzufügen")


    let user = res.locals.user;

    var subOld = submissions.getOnlyOwnSubmission(subid, usersubmissions.getSubmissionIdFromUser(user))[0];
    var attatchmentsOld = subOld.attachments;

    attatchmentsOld = attatchmentsOld.filter(at => at.id != attid);

    if(setSub(subid, user, subOld.title, subOld.comment, attatchmentsOld)){
        res.send({ok: true});
    }else{
        res.status(500).send({ok:false});
    }
})

router.get('/submission/download/:id', function (req, res, next) {
    let subid = -1;
    let attid = req.params.id;

    let subs = submissions.getAll();
    subs.forEach(sus => {
        sus.attachments.forEach(atts => {
            if(atts.id == attid){
                subid = sus.id;
            }
        })
    })

    


    let user = res.locals.user;

    var subOld = submissions.getOnlyOwnSubmission(subid, usersubmissions.getSubmissionIdFromUser(user))[0];
    var attatchmentsOld = subOld.attachments;
    var file = `${__dirname}/uploads/` + user + '/';

    attatchmentsOld.forEach(at => {
        if(at.id == attid){
            file += at.title;
        }
    })
    res.download(file); // Set disposition and send it.
});

router.put('/review/:id', function (req, res, next) {
    var subid = 0;
    let id = req.params.id;

    submissions.getAll().forEach(su => {
        su.reviews.forEach(re => {
            console.log(su.id);
            if(re.id == id){
                console.log("Review found in sub: " + su.id);
                subid = su.id;
            }
        })
    })

    submissions.updateReview(subid, id, req.body.feedback, req.body.points);
    reviews.updateReview(id, req.body.feedback, req.body.points)

   res.send({ok:true});
});

router.get('/review/:id', function (req, res, next) {
    
   res.send(reviews.getReview(req.params.id))
});

/*

STUDENT

 */

router.get('/student/workshops', (req, res, next) => {
    res.send(workshops.getWorkshopsStudent(res.locals.user));
})

router.get('/student/workshop/:id', (req, res, next) => {
    let result = workshops.getWorkshopStudent(res.locals.user, req.params.id)
    if (result.length == 0) {
        res.send(404, "ID wurde nicht gefunden :-(")
    }
    res.send(result);
})

router.get('/student/todos', (req, res, next) => {
    //Holt erst alle Submission ids an denen der User beteiligt ist
    let user = res.locals.user;
    console.log("USERERE: " + user)
    let usSubids = usersubmissions.getSubmissionIdFromUser(user);
    //Durchsucht die Workshops des users und holt alle submissions bei denen "reviewDone == false" und die nicht vom user selbst sind
    let workshopsUser = workshops.getWorkshopsStudent(user);
    var fremdeSubmissionsToReview = []
    var fremdeSubmissionsToReviewId = []
    workshopsUser.forEach(wu => {
        let wusubmissionsIds = workshopsubmission.getSubmissionIds(wu.id);
        wusubmissionsIds.forEach(wusi => {
            usSubids.forEach(ussi => {

                if (ussi != wusi.submissionid) {
                    let pushSub = submissions.getSubmission(wusi.submissionid);

                    let reviews = pushSub[0].reviews;
                    reviews.forEach(rev => {
                        var revUser = rev.firstname.toLowerCase()  + rev.lastname.toLowerCase();
                        const revUserId = users.login(revUser);
                        console.log("REVIEW username: " + revUserId + " username: " + user + " feedback: " + rev.feedback)
                        if(revUserId == user && rev.feedback == ""){
                            fremdeSubmissionsToReview.push(pushSub[0]);
                            fremdeSubmissionsToReviewId.push(rev.id);
                            console.log("revid: " + fremdeSubmissionsToReviewId)
                        }
                    })


                }
            })
        })
    })
    var todoReview = []
    var count = -1;
    fremdeSubmissionsToReview.forEach(srt => {
        console.log("fremde sub id: " + srt.id)
        var submissionid = submissions.getSubIdfromReviewId(srt.id)
        console.log("submissionid: " + submissionid)
        var workshopid = workshopsubmission.getWorkshopIds(submissionid);
        console.log("workshopid: " + workshopid[0].workshopid)
        var allworkshops = workshops.getAll()
        var workshop = null;
        allworkshops.forEach(wo => {
            console.log("suche workshop: " + workshopid[0].workshopid + " wo: " + wo.id)
            if(wo.id == workshopid[0].workshopid){
                workshop = wo;
            }
        })
        console.log("workshop title: " + workshop.title)
        console.log(workshop);
            count++;
            todoReview.push({
                id: fremdeSubmissionsToReviewId[count],
                done: false,
                deadline: srt.date,
                title: srt.title,
                firstname: srt.userid,
                lastname: srt.userid,
                submission: srt.id,
                workshopName: workshop.title
            })
        })

    //Submissions werden nach leeren abgaben durchsucht
    let submissionsTodo = submissions.areSubmissionsDone(usSubids);

    let todoSubmissions = []

    var usworkshops = workshops.getWorkshopsStudent(user)
    submissionsTodo.forEach(subtodo => {
            var workshopName = ""
            usworkshops.forEach(wo => {
                console.log("woid: " + wo.id + " wosuid: " + workshopsubmission.getWorkshopIds(subtodo.id)[0].workshopid)
                if (wo.id == workshopsubmission.getWorkshopIds(subtodo.id)[0].workshopid) {
                    console.log("found title: " + wo.title)
                    workshopName = wo.title;
                }
            })
            todoSubmissions.push({
                id: workshopsubmission.getWorkshopIds(subtodo.id)[0].workshopid,
                workshopName: workshopName
            })
        })
        //Es wird alles zusammengefügt zum ausgeben
    let todo = {
        ok: true,
        reviews: todoReview,
        submissions: todoSubmissions
    }
    res.send(todo)
})


//Nur zum testing holt alle submissions
router.get('/dev/submissions', (req, res, next) => {
    res.send(submissions.getAll())
})

//Nur zum testing holt alle submissions
router.get('/dev/reviews', (req, res, next) => {
    res.send(reviews.getAll())
})

//Nur zum testing holt alle submissions
router.get('/dev/workshops', (req, res, next) => {
    res.send(workshops.getAll())
})

/**
 * Aktuelle Datum und Uhrzeit als String
 * @return {string}
 */
function getCurrentDate() {
    //Datum
    let currentdate = new Date();
    return currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
}

/**
 * Basic Auth Middleware mit Hardcoded Usern zum Testen
 * @param req Request
 * @param res Response
 * @param next Vorherige middleware
 */
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


module.exports = router;