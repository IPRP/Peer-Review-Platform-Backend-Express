var usersubmissions = require("../models/user_submissions_mock")

var submissions = []

function getReviews(subid){
    return submissions.filter(s => s.id == subid)[0].reviews
}

/**
 * Fügt ein review zu einer submission hinzu
 * @param submissionid
 * @param vorname
 * @param nachname
 * @param feedback
 * @param points
 */
function addReview(submissionid, vorname, nachname, feedback, points, reviewid){
   
    var sub = {}
    var index = -1;
    submissions.forEach(s => {
        index++;
        if(s.id == submissionid){
            sub = s;
        }
    });
   


    var reviews = sub.reviews;
    // let reviewLength = reviews.length - 1;
    // let newId = -1;
    //
    // if(reviewLength >= 0){
    //     newId = reviewLength + 1;
    // }else{
    //     newId = 0;
    // }
   
    reviews.push({
        id: reviewid,
        firstname: vorname,
        lastname: nachname,
        feedback: feedback,
        points: points
    })
   
    submissions[index].reviews = reviews;
   
}

/**
 * Holt ein gesuchtes review aus der submission
 */
function getReview(submissionid, reviewid){
    var sub = {}
    var index = -1;
    submissions.forEach(s => {
        index++;
        if(s.id == submissionid){
            sub = s;
        }
    });
    var reviews = sub.reviews;
    var review = {}
    var indexr = -1;
    reviews.forEach(r => {
        indexr++;
        if(r.id == reviewid){
            review = r;
        }
    });
    return review;
}

/**
 * Updated ein Review anhand der submission id und der review id
 * @param submissionid
 * @param reviewid
 * @param feedback Neues feedback
 * @param points neue Punkte
 */
function updateReview(submissionid, reviewid, feedback, points){
    var sub = {}
    var index = -1;
    var indexfinal = -1;
    submissions.forEach(s => {
        index++;

        if(s.id == submissionid){
            sub = s;
            indexfinal = index;
        }
    });
    var reviews = sub.reviews;
    var review = {}
    var indexr = -1;
    var indexrfinal = -1;
    reviews.forEach(r => {
        indexr++;
        if(r.id == reviewid){
            review = r;
            indexrfinal = indexr;
        }
    });

    review.feedback = feedback;
    review.points = points;

    submissions[indexfinal].reviews[indexrfinal] = review;

}

/**
 * Setzt eine Submission anhand der ID
 * @param id Id der Submission
 * @param newSub Neue daten der Submission
 */
function setSubmission(id, newSub){
    var index = -1;
    var foundAt = -1;
    submissions.forEach(s => {
        index++;
        if (s.id == id){
            foundAt = index;
        }
    });
    submissions[foundAt] = newSub[0];
}

/**
 * Gibt die submission anhand der Submission ID zurück
 * Gilt für Teacher und Students
 * @param id Id der Submission
 * @returns {({date: string, attachments: [{id: string, title: string}], reviews: [{feedback: string, firstname: string, id: number, lastname: string, points: [{weight: number, type: string, title: string, content: string, points: number}]}], maxPoints: number, comment: string, id: number, ok: boolean, title: string, locked: boolean, reviewsDone: boolean, points: number}|{date: string, attachments: [], reviews: [{feedback: string, firstname: string, id: number, lastname: string, points: [{weight: number, type: string, title: string, content: string, points: number}]}], maxPoints: number, comment: string, id: number, ok: boolean, title: string, locked: boolean, reviewsDone: boolean, points: number})[]}
 */
function getSubmission(id){
    return submissions.filter(sub => sub.id == id);
}

/**
 * Selbe wie get user nur mit der student id in der submission
 * @param id
 * @param userid usersubmissions.getUserFromSubmission(sub.id)[0]
 * @return {{studentid: string, date: *, attachments: *, reviews: *, maxPoints: *, comment: *, id, ok: boolean, title, locked: *, reviewsDone: *, points}}
 */
function getSubmissionMitUser(id, userid){
    var sub = getSubmission(id)[0];
    console.log("usbubs")
     console.log(sub)
    console.log(userid)
    var returner = {
        id: sub.id,
        ok: true,
        studentid: userid,
        title: sub.title,
        comment: sub.comment,
        attachments: sub.attachments,
        locked: sub.locked,
        date: sub.date,
        reviewsDone: false,
        points: sub.points,
        maxPoints: sub.maxPoints,
        reviews: sub.reviews
    }
    console.log("returner")
    console.log(returner)
    return returner;

}

/**
 * Holt alle submissions die einem Studenten gehören
 * @param id Userid
 * @param usersub usersubmissions.getSubmissionIdFromUser(userid)
 * @return {({date: string, attachments: {id: string, title: string}[], reviews: {feedback: string, firstname: string, id: number, lastname: string, points: {weight: number, type: string, title: string, content: string, points: number}[]}[], maxPoints: number, comment: string, id: number, ok: boolean, title: string, locked: boolean, reviewsDone: boolean, points: number}|{date: string, attachments: *[], reviews: {feedback: string, firstname: string, id: number, lastname: string, points: {weight: number, type: string, title: string, content: string, points: number}[]}[], maxPoints: number, comment: string, id: number, ok: boolean, title: string, locked: boolean, reviewsDone: boolean, points: number})[]}
 */
function getOnlyOwnSubmission(id, usersub){
    // let usersub = usersubmissions.getSubmissionIdFromUser(id);

    var returner = []

    usersub.forEach(us => {
        if(us.userid == id){
            returner.push(getSubmission(us.submissionid))
        }
    })
    return returner;
}

/**
 * Gibt die submission eines anderen Studenten asnhand der Submission id zurück
 * @param id Id der Submission
 * @returns {{attachments: [{id: string, title: string}]|[{id: string, title: string}]|*, comment: string|*, ok: boolean, title: string|*}}
 */
function getSubmissionOtherStudent(id){
    var submission = submissions.filter(sub => sub.id == id);
    var limitedSubmission = {
        ok: true,
        title: submission[0].title,
        comment: submission[0].comment,
        attachments: submission[0].attachments
    }
    return limitedSubmission;
}

/**
 * Fügt eine Submission hinzu
 * @param workshop
 * @param studentid
 * @param ok Erfolgreich oder nicht
 * @param title Titel
 * @param comment Kommentar
 * @param attachments attachments: [{id: string, title: string}]
 * @param locked Gesperrt
 * @param date Datum
 * @param reviewDone Erledigt
 * @param points Erreichte Punkte
 * @param maxPoints Maximale punkte
 * @param reviews reviews: [{feedback: string, firstname: string, id: string, lastname: string, points: [{weight: number, type: string, title: string, content: string, points: number}]}]
 * @param submissionid
 */
function addSubmission(workshop, ok, title, comment, attachments, locked, date, reviewDone, points, maxPoints, reviews, submissionid){
    submissions.push({
        id: submissionid,
        ok: ok,
        title: title,
        comment: comment,
        attachments: attachments,
        locked: locked,
        date: date,
        reviewsDone: reviewDone,
        points: points,
        maxPoints: maxPoints,
        reviews: reviews
    })
}

/**
 * Löscht eine Submission anhand der Submission Id
 * @param id Die Id der zu löschenden Submission
 */
function delSubmission(id){
    submissions = submissions.filter(sub => sub.id != id);
}

/**
 * Checkt ob ein Review bereits gemacht ist
 * @param id Id des zu prüfenden Submission
 * @returns {boolean} true wenn done
 */
function isReviewIdDone(id){
    return isReviewDone(getSubmission(id)[0]);
}

/**
 * Checkt ob ein Review bereits gemacht ist
 * @param submission Submission Obj das zu prüfen ist
 * @returns {boolean} true wenn done
 */
function isReviewDone(submission){
    return !!submission.reviewsDone;
}

/**
 * Holt alle Submissions die im ID array sind
 * @param ids Array von Submissions ids
 * @return {[]} Die gesuchten Submissions
 */
function getSubmissions(ids){
    var subs = []
    ids.forEach(id => {
        
        const sub = getSubmission(id)[0];
        
        subs.push(sub);
    })
    return subs;
}

/**
 * Gibt alle Reviews zurück die noch zu erledigen sind.
 * Es sucht anhand eines Arrays an Submission IDs
 * @param ids Alle IDs die geprüft werden sollen
 * @returns {[]} Alle Reviews die noch erledigt werden müssen
 */
function areReviewsDone(ids){
    var todo = []
    var subs = getSubmissions(ids)
    
    subs.forEach(sub => {

        if(!isReviewDone(sub)){
            todo.push(sub);
        }
    })
    
    return todo;
}

/**
 * Prüft ob eine Submission bereits erledigt ist.
 * @param id Id der zu prüfenden submission
 * @return True wenn es bereits erledigt ist
 */
function isSubmissionIdDone(id){
    var subs = getSubmission(id)
    subs.forEach(sub => {
        return isSubmissionDone(sub);
    })
}

/**
 * Prüft ob eine Submission bereits erledigt ist.
 * @param submission Submission die geprüft wird
 * @return True wenn es bereits erledigt ist
 */
function isSubmissionDone(submission){
    return submission.attachments.length != 0;
}

/**
 * Prüft ein array an submission ids, ob diese bereits abgegeben sind
 * @param ids Ids die zu prüfen sind
 * @return {[]} Alle Submissions die noch gemacht werden müssen
 */
function areSubmissionsDone(ids){
    var todo = []
    var subs = getSubmissions(ids)

    subs.forEach(sub => {
        if(!isSubmissionDone(sub)){
            todo.push(sub);
        }
    });
    return todo;
}

function getAll(){
    return submissions;
}

/**
 * Sucht in den Submissions nach der reviewid und gibt die submissionid zurück
 * @param reviewId Gesuchte reviewid
 * @return {number} gefundene submission id, bei error -1
 */
function getSubIdfromReviewId(reviewId){
    const subs = getAll();
    var subid = -1;

    subs.forEach(sub => {
        var revs = sub.reviews;
        revs.forEach(r => {
            if(r.id == reviewId){
                subid = sub.id;
            }
        })
    });

    return subid;
}

module.exports = {
     getSubmissionMitUser, getReviews, getSubIdfromReviewId, getSubmissionOtherStudent, getSubmission, addSubmission, delSubmission, isReviewDone, areReviewsDone, areSubmissionsDone, isReviewIdDone, isSubmissionDone, isSubmissionIdDone, getOnlyOwnSubmission, getAll, setSubmission, addReview, updateReview, getReview
}