var users = require("../models/users")

var submissions = [
    {
        "id": 1,
        "studentid": 4,
        "title": "Abgabe 1",
        "comment": "Abgabe1",
        "attachments": [
            {
                "id": 2,
                "title": "Mathe.pdf"
            }
        ],
        "locked": false,
        "date": "22/5/2021 @ 14:16:4",
        "reviewsDone": true,
        "points": 15,
        "maxPoints": 20,
        "reviews": [
            {
                "id": 1,
                "firstname": "Lukas",
                "lastname": "Beck",
                "feedback": "neueueueue",
                "points": [
                    {
                        "type": "point",
                        "title": "neueueueue",
                        "content": "neueueueue",
                        "points": 15,
                        "weight": 1
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "studentid": 4,
        "title": "Abgabe 2",
        "comment": "Abgabe2",
        "attachments": [
            {
                "id": 2,
                "title": "Mathe.pdf"
            }
        ],
        "locked": false,
        "date": "22/5/2021 @ 14:16:6",
        "reviewsDone": false,
        "points": 0,
        "maxPoints": 20,
        "reviews": [
            {
                "id": 2,
                "firstname": "Lukas",
                "lastname": "Beck",
                "feedback": "",
                "points": []
            }
        ]
    },
    {
        "id": 3,
        "ok": true,
        "title": "Meine Abgabe von Lukas Beck",
        "comment": "string",
        "attachments": [
            {
                "id": 1,
                "title": "test.txt"
            }
        ],
        "locked": false,
        "date": "22/5/2021 @ 15:45:14",
        "reviewsDone": true,
        "points": 0,
        "maxPoints": 10,
        "reviews": [
            {
                "id": 3,
                "firstname": "Thomas",
                "lastname": "Wally",
                "feedback": "Das hast du wirklich gut gemacht, aber dies und das geht nicht wie erwartet.",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil dies und das nicht wie erwartet ging, gibt es 1 punkt abzug",
                        "points": 9,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 4,
                "firstname": "Kacper",
                "lastname": "Urbaniec",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 5,
                "firstname": "Océanne",
                "lastname": "Free",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 6,
                "firstname": "Stéphanie",
                "lastname": "Reddin",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 7,
                "firstname": "Crééz",
                "lastname": "McGaugan",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 8,
                "firstname": "Rachèle",
                "lastname": "Sullivan",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 9,
                "firstname": "Aurélie",
                "lastname": "Grissett",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 10,
                "firstname": "Marie-josée",
                "lastname": "Windeatt",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            }
        ]
    },
    {
        "id": 4,
        "ok": true,
        "title": "Abgabe UE17 von Thomas Wally",
        "comment": "string",
        "attachments": [
            {
                "id": 2,
                "title": "Mathe.pdf"
            }
        ],
        "locked": false,
        "date": "22/5/2021 @ 15:47:53",
        "reviewsDone": true,
        "points": 0,
        "maxPoints": 10,
        "reviews": [
            {
                "id": 11,
                "firstname": "Lukas",
                "lastname": "Beck",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 12,
                "firstname": "Kacper",
                "lastname": "Urbaniec",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 13,
                "firstname": "Océanne",
                "lastname": "Free",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 14,
                "firstname": "Stéphanie",
                "lastname": "Reddin",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 15,
                "firstname": "Crééz",
                "lastname": "McGaugan",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 16,
                "firstname": "Rachèle",
                "lastname": "Sullivan",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 17,
                "firstname": "Aurélie",
                "lastname": "Grissett",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            },
            {
                "id": 18,
                "firstname": "Marie-josée",
                "lastname": "Windeatt",
                "feedback": "Das ist eine sehr schöne Abgabe",
                "points": [
                    {
                        "type": "point",
                        "title": "Bewertung",
                        "content": "Weil das so gut war, volle punkte zahl",
                        "points": 10,
                        "weight": 1
                    }
                ]
            }
        ]
    }
]

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
    if (newSub[0].attachments != []){
        submissions[foundAt].reviewsDone = true;
    }
}

/**
 * Gibt die submission anhand der Submission ID zurück
 * Gilt für Teacher und Students
 * @param id Id der Submission
 * @returns {({date: string, attachments: [{id: string, title: string}], reviews: [{feedback: string, firstname: string, id: number, lastname: string, points: [{weight: number, type: string, title: string, content: string, points: number}]}], maxPoints: number, comment: string, id: number, ok: boolean, title: string, locked: boolean, reviewsDone: boolean, points: number}|{date: string, attachments: [], reviews: [{feedback: string, firstname: string, id: number, lastname: string, points: [{weight: number, type: string, title: string, content: string, points: number}]}], maxPoints: number, comment: string, id: number, ok: boolean, title: string, locked: boolean, reviewsDone: boolean, points: number})[]}
 */
function getSubmissionUser(id, userid){
    var subs = submissions.filter(sub => sub.id == id);
    var returneer = []
    subs.forEach(sub =>{
        var user = users.getUser(userid)
        sub.lastname = user.lastname
        sub.firstname = user.firstname
        console.log(sub)
        returneer.push(sub)
    })

    return returneer;
}

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
        reviewsDone: sub.reviewsDone,
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
            var sub = getSubmission(us.submissionid)
            var user = users.getUser(us.userid)
            sub[0].lastname = user.lastname
            sub[0].firstname = user.firstname
            console.log(sub[0])
            returner.push(sub)
        }
    })
    return returner;
}

/**
 * Gibt die submission eines anderen Studenten asnhand der Submission id zurück
 * @param id Id der Submission
 * @returns {{attachments: [{id: string, title: string}]|[{id: string, title: string}]|*, comment: string|*, ok: boolean, title: string|*}}
 */
function getSubmissionOtherStudent(id, criteria){
    var submission = submissions.filter(sub => sub.id == id);
    var limitedSubmission = {
        ok: true,
        title: submission[0].title,
        comment: submission[0].comment,
        attachments: submission[0].attachments,
        criteria: criteria
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
    if (attachments != []){
        reviewDone = true;
    }
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
        
        var sub = getSubmission(id)[0];
        var user = users.getUser(us.userid)
        sub.lastname = user.lastname
        sub.firstname = user.firstname
        console.log(sub)
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
    getSubmissionUser, getSubmissionMitUser, getReviews, getSubIdfromReviewId, getSubmissionOtherStudent, getSubmission, addSubmission, delSubmission, isReviewDone, areReviewsDone, areSubmissionsDone, isReviewIdDone, isSubmissionDone, isSubmissionIdDone, getOnlyOwnSubmission, getAll, setSubmission, addReview, updateReview, getReview
}