var usersubmissions = [
    {
        submissionid: 1,
        userid: 4
    },
    {
        submissionid: 2,
        userid: 2
    },
    {
        submissionid: 3,
        userid: 5
    },
    {
        submissionid: 4,
        userid: 4
    },
    {
        submissionid: 5,
        userid: 2
    },
    {
        submissionid: 6,
        userid: 2
    },
    {
        submissionid: 7,
        userid: 2
    },
    {
        submissionid: 8,
        userid: 2
    }
];

/**
 * Fügt einen neuen eintrag ein
 * @param userid User ID
 * @param submissionid Submission ID
 */
function add(userid, submissionid){
    usersubmissions.push({
        submissionid: submissionid,
        userid: userid
    })
}

/**
 * Gibt alle ID´s zurück in denen die gegebene Userid vorkommt
 * @param userid Die userid nach der gesucht wird
 * @returns {({submissionid: number, userid: string}|{submissionid: number, userid: string})[]}
 */
function getSubmissionIdFromUser(userid){
    const us = usersubmissions.filter(us => us.userid == userid);
    var usreturn = []
    us.forEach(u => {
        
        usreturn.push(u.submissionid);
    })
    
    return usreturn;
}

/**
 * Gibt alle ID´s zurück in denen die gegebene Submission id vorkommt
 * @param submissionid Die Submission id nach der gesucht wird
 * @returns {({submissionid: number, userid: string}|{submissionid: number, userid: string})[]}
 */
function getUserFromSubmission(submissionid){
    const us = usersubmissions.filter(us => us.submissionid == submissionid);
    var usreturn = []
    us.forEach(u => {
        usreturn.push(u.userid);
    })
    return usreturn;
}

function getAll(){
    return usersubmissions;
}

module.exports = {
    getSubmissionIdFromUser, getUserFromSubmission, add, getAll
}