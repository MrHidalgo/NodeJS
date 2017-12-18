/**
 *
 * @param app
 * @param fs
 * @param dataPath
 * @constructor
 */
exports.GetDataId =  (app, fs, dataPath) => {

    app.get('/api/users/:id', (req, res) => {

        const ID = req.params.id;

        fs.readFile(dataPath, (err, data) => {
            if(err) throw err;

            let dataJson = JSON.parse(data),
                user = null;

            for(let i = 0; i < dataJson.length; i++) {
                if(dataJson[i].id === Number(ID)) {
                    user = dataJson[i];
                    break;
                }
            }

            if(user) {
                res.send(user);
            } else {
                res.status(404).send();
            }
        });
    });

};