
let workshops = [
    {
        title: "Title",
        content: "Content",
        end: "22.2.2022",
        anonymous: false,
        teachers: ["lukas", "lukas"], //name?
        students: ["georg", "georg"],//name?
        criteria: [{
            type: "point", //"point"|"grade"|"percentage"|"truefalse"
            title: "Criteria Title",
            content: "Criteria Content",
            weight: 1.0
        }]
    },
    {
        title: "Title 2",
        content: "Content 2",
        end: "22.2.2022",
        anonymous: false,
        teachers: ["georg", "georg"], //id
        students: ["lukas", "lukas"],//id
        criteria: [{
            type: "point 2", //"point"|"grade"|"percentage"|"truefalse"
            title: "Criteria Title 2",
            content: "Criteria Content 2",
            weight: 2.0
        }]
    }
]

function getWorkshopsStudent(studentName) {
    var data = [];
    workshops.forEach(workshop => workshop.students.forEach(student => {
        if (student === studentName){
            if(!data.find(w => w === workshop)) {
                data.push(workshop);
            }
        }
    }));
    return data;
}

function addWorkshop(title, content, end, anonymous, teachers, students, criteria) {
    workshops.push({
        title: title,
        content: content,
        end: end,
        anonymous: anonymous,
        teachers: teachers, //id
        students: students,//id
        criteria: criteria
    });
}

/* Durch was wird der Workshop identifiziert?

function delWorkshop(nickname) {
    obj.heroes = obj.heroes.filter(function(el){return el.name.nickName != nickname;});
}

*/


module.exports = {
    addWorkshop, getWorkshopsStudent
}