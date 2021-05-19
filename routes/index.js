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
    res.send(sendSub[0]);
});

router.post('/submission/:id', function(req, res, next) {
    //ID
    let subs = submissions.getAll();
    let newID = -1
    if(subs.length == 0){
        newID = 1
    }else{
        let sublength = subs.length - 1;
        newID = subs[sublength].id + 1;
    }
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
    students.forEach(stu => {
        if (stu != res.locals.user) {
            //Erstelle leeres Review für jeden student
            var userobj = users.getUser(stu);
            var vorname = userobj.firstname;
            var nachname = userobj.lastname;
            submissions.addReview(newID, vorname, nachname, "", [], reviews.addReview({
                feedback: "",
                points: [],
                firstname: vorname,
                lastname: nachname,
            }));
        }
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
    console.log("User")
    console.log(user)
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
        if (sus.attachments.length != 0) {
            sus.attachments.forEach(atts => {
                if (atts.id == attid) {
                    subid = sus.id;
                }
            })
        }
    })
    let user = res.locals.user;






    //Finde attachment
    const attachment = attachments.getAtt(attid)[0]

    var file = `${__dirname}/uploads/` + user + '/' + attachment.title;

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
    var subIds = workshopsubmission.getSubmissionIds(req.params.id);
    console.log("subis " + subIds[0].submissionid)
    var subs = []
    var revs = []
    subIds.forEach(si => {
        subs.push(submissions.getSubmission(si.submissionid))
        revs.push(submissions.getReviews(si.submissionid))
    })

    var realresult = []
    result.forEach(r => {
        realresult.push({
            ok: true,
            workshop: {
                title: r.title,
                content: r.content,
                end: r.end,
                teachers: r.teachers,
                students: r.students,
                submissions: subs,
                reviews: revs

            }
        })
    })
    res.send(realresult[0]);
    // res.send(result)
})

router.get('/student/todos', (req, res, next) => {
    var todoReview = []
    var todoSubmissions = []

    //Geht alle existierenden Submissions durch, wenn die Userid passt und das Feedback leer ist, dann wird es angezeigt
    var subs = submissions.getAll()
    subs.forEach(submission => {
        var worksubSubmissionId = workshopsubmission.getWorkshopIds(submission.id);
        console.log("WORKSHOP ERROR: ")
        console.log(worksubSubmissionId)
        var submissionuser = usersubmissions.getUserFromSubmission(submission.id);
        var workshopvonsubmission = workshops.getWorkshopStudent(res.locals.user, worksubSubmissionId[0].workshopid)
        var workshopid = workshopvonsubmission[0].id
        var workshop = {}
        workshops.getAll().forEach(wo => {
            if(wo.id == workshopid){
                workshop = wo;
            }
        })
        var submissionreviews = submissions.getReviews(submission.id)
        submissionreviews.forEach(subre => {
            if (subre.feedback.length == 0 && users.login(subre.firstname + subre.lastname) == res.locals.user){
                todoReview.push({
                    id: subre.id,
                    done: false,
                    deadline: subre.date,
                    title: subre.title,
                    firstname: subre.userid,
                    lastname: subre.userid,
                    submission: subre.id,
                    workshopName: workshop.title
                })
            }
        })
    })

    //Geht alle workshops des Users durch, wenn zu einem workshop noch nicht alle Submissions vorhanden sind, werden diese Fehlenden hier angezeigt

    var ws = workshops.getWorkshopsStudent(res.locals.user);

    ws.forEach(workshop => {
        var workshopuser = workshop.students
        var workshopsubmissions = workshopsubmission.getSubmissionIds(workshop.id);
        var workshopssubmissionusers = []
        //Geht alle user des workshops durch und schaut ob jeder schon eine submission hat, wenn nicht ist die submission todo
        workshopuser.forEach(wouser => {
            var subidsuser = usersubmissions.getSubmissionIdFromUser(wouser)
            if(workshopsubmissions.length != 0) {
                workshopsubmissions.forEach(wosub => {
                    var isPresent = false;
                    subidsuser.forEach(suuser => {
                        if (suuser.submissionid == wosub.submissionid){
                            isPresent = true
                        }
                    })

                    if (isPresent) {
                        var doPush = false;
                        todoSubmissions.forEach(todosub => {
                            if (todosub.id == workshop.id) {
                                doPush = true;
                            }
                        })
                        if (!doPush) {
                            todoSubmissions.push({
                                id: workshop.id,
                                workshopName: workshop.title
                            })
                        }
                    }
                })
            }else{
                var doPush = false;
                todoSubmissions.forEach(todosub => {
                    if (todosub.id == workshop.id) {
                        doPush = true;
                    }
                })
                if (!doPush) {
                    todoSubmissions.push({
                        id: workshop.id,
                        workshopName: workshop.title
                    })
                }
            }
        })
    })


    function todoSubmission(){

    }




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

//Nur zum testing holt alle submissions
router.get('/login', (req, res, next) => {
    var loginState = users.login(res.locals.user)
    console.log("login state: " + loginState)
    if(loginState == -1){
        console.log("fail")
        res.sendStatus(403);
    }else {
        console.log("erfolg")
        res.send({
            id: loginState.toString()
        });
    }
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