var usersubmissions = [
    {
        submissionid: 1,
        userid: "thomas"
    },
    {
        submissionid: 2,
        userid: "lukasb"
    }
];

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

module.exports = {
    getSubmissionIdFromUser, getUserFromSubmission
}