/**
 *
 * @param app
 * @param fs
 * @param dataPath
 * @constructor
 */
exports.DeleteData = (app, fs, dataPath) => {

    app.delete('/api/users/:id', (req, res) => {

        const id = req.params.id;

        fs.readFile(dataPath, (err, data) => {
            let oldDataJson = JSON.parse(data);

            let index = -1;

            for (let i = 0; i < oldDataJson.length; i++) {
                if (oldDataJson[i].id === Number(id)) {
                    index = i;
                    break;
                }
            }

            if(index > -1) {
                let user = oldDataJson.splice(index, 1)[0],
                    newDataJson = JSON.stringify(oldDataJson);

                fs.writeFile(dataPath, newDataJson, (err) => {
                   if(err) throw err;
                });

                res.send(user);
            } else {
                res.status(404).send();
            }
        });
    });

};
