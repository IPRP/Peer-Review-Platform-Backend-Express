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

| User   | Password |
|--------|----------|
| georg  | 1234     |
| lukas  | 1234     |
| thomas | 1234     |
| lukasb | 1234     |
| kacper | 1234     |


## Routes
**Alle Routes immer mit Basic Auth**
### Allgemein
| Route                  | Methode | Parameter  | Rückgabe                                                                                                                                                                                                                                                                                                                                                                                                                             |
|------------------------|---------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /submission/{id}      | GET     |  | [{<br>"id": 1,<br>"ok": false,<br>"title": "Title",<br>"comment": "Comment",<br>"attachments": [],<br>"locked": false,<br>"date": "22.2.2023",<br>"reviewsDone": false,<br>"points": 10,<br>"maxPoints": 10,<br>"reviews": [<br>{"id": 1,"firstname": "Vorname","lastname": "Nachname","feedback": "feedback","points": [{"type": "point","title": "Feedback title","content": "Feedback content","points": 10,"weight": 1}]}]<br>}] |
| /submission/{id}       | POST    |{<br>"title": "string", <br>"comment": "string", <br>"attachments": []<br>}      |   {"ok": true}                                                                                                                                                                                                                                                                                                                                                                                                                            |
| /submission/{id}   | PUT        | {<br>"title": "neueueueueue", <br>"comment": "neueueueueue", <br>"attachments": []<br>}           |   {"ok": true}                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| /submission/upload/{id}  | POST | In Postman muss im Body 'form-data' gewählt werden und dann als key 'upload' und als Value das File |   {"ok": true}                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| /submission/{subid}/remove/{att_id} | DELETE|            |       {"ok": true}                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                        |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                        |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                        |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                      |
  
### Student
| Route                  | Methode | Parameter  | Rückgabe                                                                                                                                                                                                                                                                                                                                                                                                                             |
|------------------------|---------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /student/workshops     | GET     |  | [{<br>id: 1, <br>title: "...",<br>content: "...",<br>end: "...",<br>anonymous: false, <br>teachers: ["id", "id"],<br> students: ["id", "id", "id"],<br> criteria: [{type: "point""grade""percentage""truefalse" ,            title: "Criteria Title 6",             content: "Criteria Content 6",             weight: 2.0         }]     <br>}]                                                                                     |
| /student/workshop/{id} | GET     |  | {<br>id: 2, <br>title: "...",<br>content: "...",<br>end: "...",<br>anonymous: false, <br>teachers: ["id", "id"],<br> students: ["id", "id", "id"],<br> criteria: [{type: "point""grade""percentage""truefalse" ,            title: "Criteria Title 6",             content: "Criteria Content 6",             weight: 2.0         }]     <br>}                                                                                       |
| /student/todo          | GET     |  | {<br>"ok": true,<br>"reviews": [ <br>{<br>"done": false,<br>"deadline": "22.2.2023",<br>"title": "Title2",<br>"lastname": "lastname not implemented",<br>"submission": 2,<br>"workshopName": "reviewid not implemented"<br>}<br>],<br>"submissions": [<br>{<br>"id": 1<br>}<br>]<br>}                                                                                                                                                |


### Teacher
| Route                  | Methode | Parameter  | Rückgabe                                                                                                                                                                                                                                                                                                                                                                                                                             |
|------------------------|---------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|                        |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                        |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                        |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                        |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                      |