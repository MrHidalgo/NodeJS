// const express = require('express'),
//     bodyParser = require('body-parser'),
//     fs = require('fs'),
//     jsonData = require('../data/user'),
//     app = express(),
//     jsonParser = bodyParser.json();
//
// exports.putData = app.put('/api/users', jsonParser, (req, res) => {
//     if (!req.body) {
//         res.sendStatus(400);
//     }
//
//     const userId = req.body.id,
//         userName = req.body.name,
//         userAge = req.body.age;
//
//     const data = fs.readFile(jsonData, 'utf8'),
//         users = JSON.parse(data);
//
//     let user = null;
//
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].id === userId) {
//             user = users[i];
//             break;
//         }
//     }
//
//     if (user) {
//         user.name = userName;
//         user.age = userAge;
//
//         let data = JSON.stringify(users);
//
//         fs.writeFile(jsonData, data);
//
//         res.send(user);
//     } else {
//         res.status(404).send(user);
//     }
// });