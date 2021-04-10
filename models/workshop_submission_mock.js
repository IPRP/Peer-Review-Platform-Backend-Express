var workshopsubmission = [
    {
        workshopid: 1,
        submissionid: 1
    },
    {
        workshopid: 2,
        submissionid: 2
    }
]

/**
 * Gibt die Workshop id zurück, die zu der submissionid passt
 * @param submissionid Submission Id des gesuchten workshops
 * @return {({submissionid: number, workshopid: number}|{submissionid: number, workshopid: number})[]}
 */
function getWorkshopIds(submissionid){
    return workshopsubmission.filter(ws => ws.submissionid === submissionid);
}

/**
 * Gibt die submission id zurück, die zu der workshop id passt
 * @param workshopid Workshop id der gesuchten submission
 * @return {({submissionid: number, workshopid: number}|{submissionid: number, workshopid: number})[]}
 */
function getSubmissionIds(workshopid){
    return workshopsubmission.filter(ws => ws.workshopid === workshopid);
}

module.exports = {
    getSubmissionIds, getWorkshopIds
}