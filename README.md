# Peer-Review-Platform-Backend-Express
Install Node Modules:
```sh
npm i
```
Start Server:

```sh
npm start
```

Port: 3000
```sh
3000
```

# Test User
Für Basic Auth gibt es derzeit 5 Test User. Diese werden auch in den Test Daten verwendet

## Students
| User   | Password |
|--------|----------|
| thomaswally | 1234     |
| lukasbeck | 1234     |
| kacperurbaniec | 1234     |

Der User lukasbeck hat die meisten Testdaten
## Teacher

| User   | Password |
|--------|----------|
| georgreisinger  | 1234     |
| lukasnowy  | 1234     |


## Routes
**Alle Routes immer mit Basic Auth**
### Login
| Route                  | Methode | Parameter  | Rückgabe                                                                                                                                                                                                                                                                                                                                                                                                                             |
|------------------------|---------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /login      | GET     |  | {"id": "2"}  |


### Allgemein
| Route                  | Methode | Parameter  | Rückgabe                                                                                                                                                                                                                                                                                                                                                                                                                             |
|------------------------|---------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /submission/{id}      | GET     |  | [{<br>"id": 1,<br>"ok": false,<br>"title": "Title",<br>"comment": "Comment",<br>"attachments": [{ "id": 1, "title": "" }],<br>"locked": false,<br>"date": "22.2.2023",<br>"reviewsDone": false,<br>"points": 10,<br>"maxPoints": 10,<br>"reviews": [<br>{"id": 1,"firstname": "Vorname","lastname": "Nachname","feedback": "feedback","points": [{"type": "point","title": "Feedback title","content": "Feedback content","points": 10,"weight": 1}]}]<br>}] |
| /submission/{id}       | POST    |{<br>"title": "string", <br>"comment": "string", <br>"attachments": [{ "id": 1, "title": "" }]<br>}      |   {"ok": true}                                                                                                                                                                                                                                                                                                                                                                                                                            |
| /submission/{id}   | PUT        | {<br>"title": "neueueueueue", <br>"comment": "neueueueueue", <br>"attachments": [{ "id": 1, "title": "" }]<br>}           |   {"ok": true}                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| /submission/upload <br>Issue: https://github.com/IPRP/Peer-Review-Platform-Backend-Express/issues/1 <br>Workaround -> /upload | POST | In Postman muss im Body 'form-data' gewählt werden und dann als key 'file' und als Value das File |   {"ok": true}                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| /submission/remove/{att_id} | DELETE|            |       {"ok": true}                                                                                                                                                                                                                                                                                                                                                                                                                               |
| /submission/download/{att_id}| GET        |            | Das angeforderte FILE                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| /review/{review_id}| PUT|{"feedback": "feedback", <br>"points": [{"type": "point","title": "Feedback title2","content": "Feedback content2","points": 10.0,"weight": 1.0<br>}] }  | {"ok": true}   |
| /review/{review_id}| GET|            | {"ok": true, "feedback": "feedback", <br>"points": [{"type": "point","title": "Feedback title2","content": "Feedback content2","points": 10.0,"weight": 1.0<br>}] }   |
  
### Student
| Route                  | Methode | Parameter  | Rückgabe                                                                                                                                                                                                                                                                                                                                                                                                                             |
|------------------------|---------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /student/workshops     | GET     |  | [{<br>"id": 1, <br>"title": "...",<br>"content": "...",<br>"end": "...",<br>"anonymous": false, <br>"teachers": ["id", "id"],<br> "students": ["id", "id", "id"],<br> "criteria": [{"type": "point""grade""percentage""truefalse" ,            "title": "Criteria Title 6",             "content": "Criteria Content 6",             "weight": 2.0         }]     <br>}]                                                                                     |
| /student/workshop/{id} | GET     |  | {<br>"id": 2, <br>"title": "...",<br>"content": "...",<br>"end": "...",<br>"anonymous": false, <br>"teachers": ["id", "id"],<br> "students": ["id", "id", "id"],<br> "criteria": [{"type": "point""grade""percentage""truefalse" ,            "title": "Criteria Title 6",             "content": "Criteria Content 6",             "weight": 2.0         }]     <br>}                                                                                       |
| /student/todo          | GET     |  | {<br>"ok": true,<br>"reviews": [<br>{<br>"id": 2,<br>"done": false,<br>"submission": 2,<br>"workshopName": "DAS"<br>}<br>],<br>"submissions": [<br>{<br>"id": 2,<br>"workshopName": "SWE"<br>},<br>{<br>"id": 3,<br>"workshopName": "INNO"<br>}<br>]<br>} |

                                                                                                                                                                                                                                                                                                                                                                                                                          
### Teacher
| Route                  | Methode | Parameter  | Rückgabe                                                                                                                                                                                                                                                                                                                                                                                                                             |
|------------------------|---------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|/teacher/workshops            |   GET      |            |       [{title, content, end, anonymous, teachers[], students[], criteria: [{type, title, content, weight}]}]                                                                                                                                                                                                                                                                                                                                                                                                                               |
|/teacher/workshop/:id     |    GET     |            |        {title, content, end, anonymous, teachers[], students[], criteria: [{type, title, content, weight}]}                                                                                                                                                                                                                                                                                                                                                                                                                              |
|/teacher/workshop        |    POST     | {title, content, end, anonymous, teachers[], students[], criteria: [{type, title, content, weight}]}           |                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|/teacher/workshop/:id                      |    PUT     |    {title, content, end, anonymous, teachers[], students[], criteria: [{type, title, content, weight}]}        |                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|/teacher/workshop/:id                    |   DELETE      |            |                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|/teacher/search/student                    |   GET      |    {firstname, lastname}        |                      [{id, firstname, lastname, group}]                                                                                                                                                                                                                                                                                                                                                                                                                |
|/teacher/search/student                    |   GET      |    {group}        |                  [{id, firstname, lastname, group}]                                                                                                                                                                                                                                                                                                                                                                                                                    |
