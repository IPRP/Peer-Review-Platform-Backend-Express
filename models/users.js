var users = [{
        id: 0,
        firstname: "Lukas",
        lastname: "Nowy",
        group: "D1"
    },
    {
        id: 1,
        firstname: "Lukas",
        lastname: "Beck",
        group: "C1"
    },
    {
        id: 2,
        firstname: "Georg",
        lastname: "Reisinger",
        group: "D1"
    },
    {
        id: 3,
        firstname: "Thomas",
        lastname: "Wally",
        group: "C1"
    },
    {
        id: 4,
        firstname: "Kacper",
        lastname: "Urbaniec",
        group: "B1"
    },
]

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