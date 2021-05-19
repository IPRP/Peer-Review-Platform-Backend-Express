const fs = require('fs');

let rawdata = fs.readFileSync('./models/users_mocked.json');
var users = JSON.parse(rawdata);


function searchStudents(firstname, lastname) {
    return users.filter(obj => { return obj.firstname.includes(firstname) && obj.lastname.includes(lastname) });
}

function searchStudentsGroup(group) {
    return users.filter(obj => { return obj.group == group });
}

function searchStudentsID(id) {
    return users.filter(obj => { return obj.id == id });
}


/** Holt den User anhand der id
 *
 * @param id Userid
 */
function getUser(id){
    var returner = {};
    if(!isNaN(id)){
        users.forEach(user => {
            if(user.id == id){
                returner = user;
            }
        })
    }
    return returner;
}



/**
 * @param vornameNachname Vorname.toLowerCase() + nachname.toLowerCase() = Benutzername; Es kann auch anstatt vorname+nachname die userid verwendet werden
 * @returns ID wenn erfolgreich sonst -1
 */
function login(vornameNachname) {
    var returner = -1;
    if(isNaN(vornameNachname)) {
        users.forEach(e => {
            var ausDB = (e.firstname.toLowerCase() + e.lastname.toLowerCase())
            if (ausDB == vornameNachname.toLowerCase()) {
                returner = e.id;
            }
        })
    }else{
        users.forEach(e => {
            var ausDB = (e.id)
            if (ausDB == vornameNachname) {
                returner = e.id;
            }
        })
    }
    return returner;
}

module.exports = {
    searchStudents,
    searchStudentsGroup,
    searchStudentsID,
    login,
    getUser
}