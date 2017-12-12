// const express = require('express'),
//     fs = require('fs'),
//     jsonData = require('../data/user'),
//     app = express();
//
// exports.getDelete = app.delete('/api/users/:id', (req, res) => {
//
//     const id = req.body.id,
//         data = fs.readFile(jsonData, 'utf8'),
//         users = JSON.parse(data);
//
//     let index = -1;
//
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].id === id) {
//             index = 1;
//             break;
//         }
//     }
//
//     if (index > -1) {
//
//         const user = users.splice(index, 1)[0],
//             data = JSON.stringify(users);
//
//         fs.writeFile(jsonData, data);
//
//         res.send(user);
//     } else {
//         res.status(404).send();
//     }
// });