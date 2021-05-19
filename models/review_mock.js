var reviews = [
]

/**
 * Editiert ein Review
 * @param id Id des zu bearbeitenden Reviews
 * @param review Das neue Review Object
 */
function updateReview(id, feedback, points){
    var count = 0;
    reviews.forEach(rev => {
        if(rev.id == id){
            reviews[count].feedback = feedback;
            reviews[count].points = points;
        }
        count++;
    })
}

/**
 * Fügt ein Review mit neuer ID hinzu
 * @param review Neues Review
 */
function addReview(review){
    var newId = getNextId();
    reviews.push(
        {
            id: newId,
            firstname: review.firstname,
            lastname: review.lastname,
            feedback: review.feedback,
            points: review.points
        }
    )
    return newId;
}

/**
 * Löscht ein review
 * @param id Id des reviews das zu löschen ist
 */
function delReview(id){
    reviews = reviews.filter(s => s.id != id);
}

/**
 * Holt alle Reviews
 * @return {[{feedback: string, id: number, points: [{weight: number, type: string, title: string, content: string, points: number}]}]} Alle Reviews in einem Array
 */
function getAll(){
    return reviews;
}

/**
 * Holt ein Review anhand der ID
 * @param id Id des zu holenden Reviews
 * @return {{feedback: string, id: number, points: [{weight: number, type: string, title: string, content: string, points: number}]}[]} Das Review das zu holen ist
 */
function getReview(id){
    return reviews.filter(s => s.id == id);
}

/**
 * Erzeugt eine neue ID
 * @return {*} Neue id
 */
function getNextId(){
    if(reviews.length == 0){
        return 1
    }else {
        return reviews[reviews.length - 1].id + 1;
    }
}

module.exports = {
    addReview,
    delReview,
    getAll,
    getReview,
    getNextId,
    updateReview
}