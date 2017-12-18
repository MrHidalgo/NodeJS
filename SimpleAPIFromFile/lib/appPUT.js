/**
 *
 * @param app
 * @param fs
 * @param bodyParser
 * @param dataPath
 * @constructor
 */
exports.PutData = (app, fs, bodyParser, dataPath) => {

    app.put('/api/users/', bodyParser, (req, res) => {
        if (!req.body) {
            res.sendStatus(400);
        }

        const userId = req.body.id,
            userName = req.body.name,
            userAge = req.body.age;

        let user = null;

        fs.readFile(dataPath, (err, data) => {
            if (err) throw err;

            let oldDataJson = JSON.parse(data);

            for (let i = 0; i < oldDataJson.length; i++) {
                if (oldDataJson[i].id === Number(userId)) {
                    user = oldDataJson[i];
                    break;
                }
            }

            if(user) {
                user.name = userName;
                user.age = userAge;

                const newDataJson = JSON.stringify(oldDataJson);

                fs.writeFile(dataPath, newDataJson);

                res.send(user);

            } else {
                res.sendStatus(404).send(user);
            }
        });
    });

};
