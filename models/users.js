const fs = require('fs');

let rawdata = fs.readFileSync('./models/users_mocked.json');
var users = JSON.parse(rawdata);


function searchStudents(firstname, lastname) {
    return users.filter(obj => { return obj.firstname.includes(firstname) || obj.lastname.includes(lastname) });
}

function searchStudentsGroup(group) {
    return users.filter(obj => { return obj.group == group });
}

function searchStudentsID(id) {
    return users.filter(obj => { return obj.id == id });
}


/**
 * @param vornameNachname Vorname.toLowerCase() + nachname.toLowerCase() = Benutzername
 * @returns ID wenn erfolgreich sonst -1
 */
function login(vornameNachname){
    users.forEach(e => {
        if(e.firstname.toLowerCase() + e.lastname.toLowerCase() == vornameNachname){
            return e.id;
        }
    })
    return -1;
}

module.exports = {
    searchStudents,
    searchStudentsGroup,
    searchStudentsID,
    login
}