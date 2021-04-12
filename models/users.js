const fs = require('fs');

let rawdata = fs.readFileSync('./models/users_mocked.json');
var users = JSON.parse(rawdata);


function searchStudents(firstname, lastname) {
    return users.filter(obj => { return obj.firstname.includes(firstname) || obj.lastname.includes(lastname) });
}

function searchStudentsGroup(group) {
    return users.filter(obj => { return obj.group == group });
}

module.exports = {
    searchStudents,
    searchStudentsGroup
}