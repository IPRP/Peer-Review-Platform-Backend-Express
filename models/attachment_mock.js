var attachments = [
    {
        id: 1,
        title: "test.txt"
    }
]

/**
 * Löscht ein Attachment
 * @param id Id des zu löschenden Attachments
 */
function delAttachment(id){
    attachments = attachments.filter(s => s.id != id);
}

/**
 * Füght eine Attachment hinzu
 */
function addAttachment(title){
    var newId = getNextAttId();
    attachments.push({
        id: newId,
        title: title
    });
    return newId;
}

/**
 * Holt alle Attachments
 * @return {[{id: number, title: string}]}
 */
function getAll(){
    return attachments;
}

/**
 * Holtz ein attachment anhand der ID
 * @param id Die id des zu holenden Attachments
 * @return {{id: number, title: string}[]} Das attachment als Objekt
 */
function getAtt(id){
    return attachments.filter(s => s.id == id);
}

/**
 * Generiert eine neue Attachment id
 * @return {string} Neue id
 */
function getNextAttId(){
    return attachments[attachments.length-1].id + 1;
}

module.exports = {
    delAttachment,
    addAttachment,
    getAll,
    getAtt,
    getNextAttId
}