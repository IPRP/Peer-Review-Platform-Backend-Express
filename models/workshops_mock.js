let workshops = [{
        id: 1,
        title: "DAS",
        content: "Content",
        end: "2022-02-02",
        anonymous: false,
        teachers: [1], //name?
        students: [4, 2], //name?
        criteria: [{
            type: "point", //"point"|"grade"|"percentage"|"truefalse"
            title: "Criteria Title",
            content: "Criteria Content",
            weight: 1.0
        }]
    },
    {
        id: 2,
        title: "SWE",
        content: "Content 2",
        end: "2022-02-22",
        anonymous: false,
        teachers: [3, 1], //id
        students: [4, 5], //id
        criteria: [{
            type: "point", //"point"|"grade"|"percentage"|"truefalse"
            title: "Criteria Title 2",
            content: "Criteria Content 2",
            weight: 2.0
        }]
    },
    {
        id: 3,
        title: "INNO",
        content: "Content 3",
        end: "2022-04-03",
        anonymous: false,
        teachers: [3], //id
        students: [2, 4], //id
        criteria: [{
            type: "point", //"point"|"grade"|"percentage"|"truefalse"
            title: "Criteria Title 3",
            content: "Criteria Content 3",
            weight: 2.0
        }]
    },
    {
        id: 4,
        title: "Submission Test",
        content: "Submission",
        end: "2022-04-03",
        anonymous: false,
        teachers: [1], //id
        students: [2, 4], //id
        criteria: [{
            type: "point", //"point"|"grade"|"percentage"|"truefalse"
            title: "Criteria Title 3",
            content: "Criteria Content 3",
            weight: 2.0
        }],
    }
]


function getAll() {
    return workshops;
}

/**
 * Alle Workshops eines Studenten
 * @param studentName Name des Studenten
 * @returns {[]} All die Workshops des Studenten
 */
function getWorkshopsStudent(studentName) {
    var data = [];
    workshops.forEach(workshop => {
        workshop.students.forEach(student => {
            console.log("Student: " + student + " gesuchterstudent: " + studentName)
            if (student == studentName) {
                console.log("found: " + student)
                if (!data.find(w => w == workshop)) {
                    console.log("no data: " + workshop.title)
                    data.push(workshop);
                }
            }
        })
    });

    return data;
}

/**
 * Sucht einen Workshop anhand der workshop id und der student id
 * @param studentName Id des Studenten
 * @param workshopid Id des Workshops
 * @return {*[]}
 */
function getWorkshopStudent(studentName, workshopid) {
    return getWorkshopsStudent(studentName).filter(workshop => workshop.id == workshopid);
}

/**
 * Fügt einen neuen Workshop hinzu
 * @param id
 * @param title
 * @param content
 * @param end
 * @param anonymous
 * @param teachers
 * @param students
 * @param criteria
 */
function addWorkshop(id, title, content, end, anonymous, teachers, students, criteria) {
    workshops.push({
        id: id,
        title: title,
        content: content,
        end: end,
        anonymous: anonymous,
        teachers: teachers, //id
        students: students, //id
        criteria: criteria
    });
}

/* Durch was wird der Workshop identifiziert?

function delWorkshop(nickname) {
    obj.heroes = obj.heroes.filter(function(el){return el.name.nickName != nickname;});
}

*/

function getWorkshopsTeacher(teacher) {
    return workshops.filter(obj => { return obj.teachers.includes(teacher) });
}

function getWorkshopTeacher(teacher, id) {
    return workshops.find(obj => { return obj.teachers.includes(teacher) && obj.id == id });
}

function createWorkshop(workshop) {
    try {
        workshops.push({
            id: genID(),
            title: workshop.title,
            content: workshop.content,
            end: workshop.end,
            anonymous: workshop.anonymous,
            teachers: workshop.teachers, //id
            students: workshop.students, //id
            criteria: workshop.criteria
        });
    } catch (err) {
        return err;
    }

}

function editWorkshop(id, new_workshop) {
    try {
        workshops.find(obj => { return obj.id == id }).title = new_workshop.title;
        workshops.find(obj => { return obj.id == id }).content = new_workshop.content;
        workshops.find(obj => { return obj.id == id }).end = new_workshop.end;
        workshops.find(obj => { return obj.id == id }).anonymous = new_workshop.anonymous;
        workshops.find(obj => { return obj.id == id }).teachers = new_workshop.teachers;
        workshops.find(obj => { return obj.id == id }).students = new_workshop.students;
        workshops.find(obj => { return obj.id == id }).criteria = new_workshop.criteria;

    } catch (err) {
        return err;
    }
}

function deleteWorkshop(id) {
    workshops = workshops.filter(obj => { return obj.id != id });
}

function genID() {
    return Math.floor((Math.random() * 100000) + 1);
}


module.exports = {
    addWorkshop,
    getWorkshopsStudent,
    getWorkshopStudent,
    getWorkshopsTeacher,
    getWorkshopTeacher,
    createWorkshop,
    editWorkshop,
    deleteWorkshop,
    getAll
}