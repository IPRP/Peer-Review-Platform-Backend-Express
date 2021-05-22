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
    if(res.locals.user != 3 && res.locals.user != 1) {
        console.log("student")
        let sendSub = submissions.getOnlyOwnSubmission(res.locals.user, usersubmissions.getSubmissionIdFromUser(res.locals.user));
        if (sendSub == undefined) {
            res.status(404).send("Submission wurde nicht gefunden!")
        }
        var returner = sendSub.filter(f => f.id != req.params.id)[0][0];

        res.send(returner);
    }else {
        console.log("teacher")
        let sendSub = submissions.getSubmissionUser(req.params.id, res.locals.user)
        if (sendSub == undefined) {
            res.status(404).send("Submission wurde nicht gefunden!")
        }
        res.send(sendSub[0]);
    }
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
    var username = users.getUser(res.locals.user)
    submissions.addSubmission(workshop, true, req.body.title + " von " + username.firstname + " " + username.lastname, req.body.comment, req.body.attachments, false, datetime, false, 0, maxpoints, [], newID)
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
            if(re.id == id){
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
    var ignoreWorkshops = [];
    ws.forEach(workshop => {
        var workshopuser = workshop.students
        var workshopsubmissions = workshopsubmission.getSubmissionIds(workshop.id);
        var workshopssubmissionusers = []
        //Geht alle user des workshops durch und schaut ob jeder schon eine submission hat, wenn nicht ist die submission todo
        workshopuser.forEach(wouser => {
            var subidsuser = usersubmissions.getSubmissionIdFromUser(wouser)

            //Geht jetzt alle submissions ids des workshops durch

            if(workshopsubmissions.length != 0) {
                //Geht hier alle submission ids des jetztigen workshopusers durch
                workshopsubmissions.forEach(wosub => {
                    var isPresent = false;

                    subidsuser.forEach(suuser => {
                        //Wenn der aktuelle Workhopuser die selbe submissionid hat wie die aktuelle workshop submission, dann ist die abgabe bereits gemacht
                        console.log("Usersubsid : " + suuser.submissionid + " workshopsubmission " + wosub.submissionid + " usersub " + suuser.userid + " akt user "+ res.locals.user)

                        if (suuser.submissionid == wosub.submissionid && suuser.userid == res.locals.user){
                            console.log("FOUND workshop " + wosub.workshopid)
                            isPresent = true


                            //Suche ob es bereits erstellt wurde, kann passieren weil eine vorherige submission von einem anderen user war
                            // Darum muss wenn es doch schon abgegeben wurde, die submission wieder gelöscht werden
                            //Ignore ist dafür da wenn dder workshop nach dem gefundenen nochmal probiert wird hinzuzufügen um das zu verhindern
                            ignoreWorkshops.push(wosub.workshopid)

                            //Das ist wenn der workshop schon in der Liste ist aber dort nicht rein soll
                            var newTodoSub = []
                            todoSubmissions.forEach(ts => {
                                console.log("Todo sub " + ts.id + " aktuelle workshopid " + wosub.workshopid)
                                if(ts.id != wosub.workshopid){
                                    console.log("PUSH")
                                    newTodoSub.push(ts);
                                }
                            })
                            todoSubmissions = newTodoSub;
                        }
                    })

                    //Wenn abgabe bereits gemecht (present)
                    console.log("Ignoring done workshops")
                    console.log(ignoreWorkshops)
                    console.log(workshop.id)
                    console.log(!ignoreWorkshops.includes(workshop.id))
                    console.log(subidsuser.length != 0)
                    console.log(!isPresent)
                    console.log(todoSubmissions)
                    if (!isPresent && subidsuser.length != 0 && !ignoreWorkshops.includes(workshop.id)) {
                        console.log("NOCH NICHT GEMACHT: " + workshop.id)
                        console.log(todoSubmissions)
                        var doPush = false;
                        //Geht die aktuelle todoliste durch und sucht duplicate
                        todoSubmissions.forEach(todosub => {
                            //Wenn bereits vorhanden dann true
                            if (todosub.id == workshop.id) {
                                doPush = true;
                            }
                        })
                        //Mache nicht wenn bereits vorhanden
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
router.get('/dev/user/submissions', (req, res, next) => {
    res.send(usersubmissions.getAll())
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
router.get('/dev/users', (req, res, next) => {
    res.send(users.getAll())
})

//Nur zum testing holt alle submissions
router.get('/dev/attachments', (req, res, next) => {
    res.send(attachments.getAll())
})

//Nur zum testing holt alle submissions
router.get('/dev/workshop/submission', (req, res, next) => {
    res.send(workshopsubmission.getAll())
})

//Nur zum testing holt alle submissions
router.get('/login', (req, res, next) => {
    var loginState = users.login(res.locals.user)
    if(loginState == -1){
        res.sendStatus(403);
    }else {
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