var usersubmissions = require("../models/user_submissions_mock")

var submissions = [
    {
        id: 1,
        ok: false,
        title: "Title",
        comment: "Comment",
        attachments: [ ],
        locked: false,
        date: "22.2.2023",
        reviewsDone: false,
        points: 10.0,
        maxPoints: 10.0,
        reviews: [ {
            id: 1,
            firstname: "Vorname",
            lastname: "Nachname",
            feedback: "feedback",
            points: [{
                type: "point",
                title: "Feedback title",
                content: "Feedback content",
                points: 10.0,
                weight: 1.0
            }]
        }]
    },
    {
        id: 2,
        ok: false,
        title: "Title2",
        comment: "Comment2",
        attachments: [ ],
        locked: false,
        date: "22.2.2023",
        reviewsDone: false,
        points: 5.0,
        maxPoints: 10.0,
        reviews: [ {
            id: 2,
            firstname: "Vorname2",
            lastname: "Nachname2",
            feedback: "feedback2",
            points: [{
                type: "point",
                title: "Feedback title2",
                content: "Feedback content2",
                points: 10.0,
                weight: 1.0
            }]
        }]
    },

]

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
 * Holt alle submissions die einem Studenten gehören
 * @param id Id der angefragten Submission
 * @param userid Id des anfragenden users
 * @return {({date: string, attachments: {id: string, title: string}[], reviews: {feedback: string, firstname: string, id: number, lastname: string, points: {weight: number, type: string, title: string, content: string, points: number}[]}[], maxPoints: number, comment: string, id: number, ok: boolean, title: string, locked: boolean, reviewsDone: boolean, points: number}|{date: string, attachments: *[], reviews: {feedback: string, firstname: string, id: number, lastname: string, points: {weight: number, type: string, title: string, content: string, points: number}[]}[], maxPoints: number, comment: string, id: number, ok: boolean, title: string, locked: boolean, reviewsDone: boolean, points: number})[]}
 */
function getOnlyOwnSubmission(id, userid){
    let usersub = usersubmissions.getSubmissionIdFromUser(userid);
    if(usersub != id){
        return getSubmission(id);
    }
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
 * @param id ID
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
 */
function addSubmission(id, ok, title, comment, attachments, locked, date, reviewDone, points, maxPoints, reviews){
    submissions.push({
        id: id,
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

module.exports = {
    getSubmissionOtherStudent, getSubmission, addSubmission, delSubmission, isReviewDone, areReviewsDone, areSubmissionsDone, isReviewIdDone, isSubmissionDone, isSubmissionIdDone, getOnlyOwnSubmission
}