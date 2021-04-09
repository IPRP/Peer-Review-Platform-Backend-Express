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
| Route                  | Methode | Parameter  | Rückgabe                                                                                                                                                                                                                                                                                                                 |
|------------------------|---------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /student/workshops     | GET     | Basic Auth | [{title: "...",<br>content: "...",<br>end: "...",<br>anonymous: false, <br>teachers: ["id", "id"],<br> students: ["id", "id", "id"],<br> criteria: [{type: "point""grade""percentage""truefalse" ,            title: "Criteria Title 6",             content: "Criteria Content 6",             weight: 2.0         }]     },...] |
| /student/workshop/{id} | GET     | Basic Auth | {title: "...",<br>content: "...",<br>end: "...",<br>anonymous: false, <br>teachers: ["id", "id"],<br> students: ["id", "id", "id"],<br> criteria: [{type: "point""grade""percentage""truefalse" ,            title: "Criteria Title 6",             content: "Criteria Content 6",             weight: 2.0         }]     } |
