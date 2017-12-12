exports.PostData = (app, fs, bodyParser, dataPath) => {

    app.post('/api/users/', bodyParser, (req, res) => {
        if (!req.body) {
            res.sendStatus(400);
        }

        const userName = req.body.name,
            userAge = req.body.age;

        const user = {
            name: userName,
            age: userAge
        };

        fs.readFile(dataPath, (err, data) => {
            if (err) throw err;

            let dataJson = JSON.parse(data);

            const MAX_ID = Math.max.apply(Math, dataJson.map((item) => {
                return item.id;
            }));

            user.id = MAX_ID + 1;
            dataJson.push(user);

            let newData = JSON.parse(data);

            fs.writeFile(dataPath, newData, (err) => {
               if (err) throw err;

               // res.end(data);
            });
        });
    });
};
//
//
// exports.postData = app.post('/api/users/', jsonParser, (req, res) => {
//     if (!req.body) {
//         res.sendStatus(400);
//     }
//
//     const userName = req.body.name,
//         userAge = req.body.age;
//
//     const user = {
//         name: userName,
//         age: userAge
//     };
//
//     let oldData = fs.readFile(jsonData, 'utf9'),
//         users = JSON.parse(oldData);
//
//     const id = Math.max.apply(Math, users.map((item) => {
//         return item.id;
//     }));
//
//     user.id = id + 1;
//     users.push(user);
//
//     let newData = JSON.parse(users);
//
//     fs.writeFile(jsonData, newData);
//     res.end(user);
// });