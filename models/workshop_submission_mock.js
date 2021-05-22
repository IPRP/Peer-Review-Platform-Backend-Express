var workshopsubmission = [
    {
        workshopid: 4,
        submissionid: 1
    },
    {
        workshopid: 3,
        submissionid: 2
    },
    {
        "workshopid": 1,
        "submissionid": 3
    },
    {
        "workshopid": 1,
        "submissionid": 4
    }
]

/**
 * Fügt einen neuen Eintrag ein
 * @param workshopid
 * @param submissionid
 */
function add(workshopid, submissionid){
    workshopsubmission.push({
        workshopid: workshopid,
        submissionid: submissionid
    })
}

/**
 * Gibt die Workshop id zurück, die zu der submissionid passt
 * @param submissionid Submission Id des gesuchten workshops
 * @return {({submissionid: number, workshopid: number}|{submissionid: number, workshopid: number})[]}
 */
function getWorkshopIds(submissionid){
    return workshopsubmission.filter(ws => ws.submissionid == submissionid);
}

/**
 * Gibt die submission id zurück, die zu der workshop id passt
 * @param workshopid Workshop id der gesuchten submission
 * @return {({submissionid: number, workshopid: number}|{submissionid: number, workshopid: number})[]}
 */
function getSubmissionIds(workshopid){
    return workshopsubmission.filter(ws => ws.workshopid == workshopid);
}

function getAll(){
    return workshopsubmission;
}

module.exports = {
    getSubmissionIds, getWorkshopIds, add, getAll
}