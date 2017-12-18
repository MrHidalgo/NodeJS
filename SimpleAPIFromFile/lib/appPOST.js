/**
 *
 * @param app
 * @param fs
 * @param bodyParser
 * @param dataPath
 * @constructor
 */
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

            let oldDataJson = JSON.parse(data);

            const MAX_ID = Math.max.apply(Math, oldDataJson.map((item) => {
                return item.id;
            }));

            user.id = MAX_ID + 1;

            oldDataJson.push(user);

            let newDataJson = JSON.stringify(oldDataJson);

            fs.writeFile(dataPath, newDataJson, (err) => {
                if (err) throw err;
            });

            res.send(user);
        });
    });

};
