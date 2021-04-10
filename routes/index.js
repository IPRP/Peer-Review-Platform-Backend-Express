var express = require('express');
var router = express.Router();

var workshops = require("../models/workshops_mock")
var submissions = require("../models/submission_mock")
var usersubmissions = require("../models/user_submissions_mock")
var workshopsubmission = require("../models/workshop_submission_mock")

//BasicAuth middleware injection
router.use(user);
/*


ALLGEMEIN


 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/submissions/:id', function(req, res, next){
  let sendSub = submissions.getOnlyOwnSubmission(req.params.id, res.locals.user)
  
  if(sendSub == undefined){
    res.send(404, "Submission wurde nicht gefunden!")
  }
  res.send(sendSub);
});

/*

STUDENT

 */

router.get('/student/workshops', (req, res, next) => {
  res.send(workshops.getWorkshopsStudent(res.locals.user));
})

router.get('/student/workshop/:id', (req, res, next) => {
  let result = workshops.getWorkshopStudent(res.locals.user, req.params.id)
  if(result.length == 0){
    res.send(404, "ID wurde nicht gefunden :-(")
  }
  res.send(result);
})

router.get('/student/todos', (req, res, next) => {
  //Holt erst alle Submission ids an denen der User beteiligt ist
  let user = res.locals.user;
  let usSubids = usersubmissions.getSubmissionIdFromUser(user);
  //Durchsucht die Workshops des users und holt alle submissions bei denen "reviewDone == false" und die nicht vom user selbst sind
  let workshopsUser = workshops.getWorkshopsStudent(user);
  var fremdeSubmissionsToReview = []
  workshopsUser.forEach(wu => {
    let wusubmissionsIds = workshopsubmission.getSubmissionIds(wu.id);
    wusubmissionsIds.forEach(wusi => {
      usSubids.forEach(ussi => {
        
        if( ussi != wusi.submissionid){
          let pushSub = submissions.getSubmission(wusi.submissionid);
          
          fremdeSubmissionsToReview.push(pushSub[0]);
        }
      })
    })
  })
  var todoReview = []
  fremdeSubmissionsToReview.forEach(srt => {
    
    todoReview.push({
      done: false,
      deadline: srt.date,
      title: srt.title,
      firstname: srt.userid,
      lastname: "lastname not implemented",
      submission: srt.id,
      workshopName: "reviewid not implemented"
    })
  })
  //Submissions werden nach leeren abgaben durchsucht
  let submissionsTodo = submissions.areSubmissionsDone(usSubids);
  
  let todoSubmissions = []

  var usworkshops = workshops.getWorkshopsStudent(user)
  submissionsTodo.forEach(subtodo => {
    var workshopName = ""
    usworkshops.forEach(wo =>{
      if(wo.id == workshopsubmission.getWorkshopIds(subtodo.id)[0].workshopid){
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
    if ((credentials[0] === "georg" && credentials[1] === "1234")||(credentials[0] === "lukas" && credentials[1] === "1234")||(credentials[0] === "thomas" && credentials[1] === "1234")||(credentials[0] === "lukasb" && credentials[1] === "1234")||(credentials[0] === "kacper" && credentials[1] === "1234")) {
      // The username and password are correct, so the user is authorized.
      res.locals.user = credentials[0];
      next();
    } else {
      // The user typed in the username or password wrong.
      res.status(403).send("Access Denied (incorrect credentials)");
    }
  }
};

module.exports = router;
