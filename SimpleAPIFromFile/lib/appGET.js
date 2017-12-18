/**
 *
 * @param app
 * @param fs
 * @param dataPath
 * @constructor
 */
exports.GetData = (app, fs, dataPath) => {

    app.get('/api/users/', (req, res) => {
        fs.readFile(dataPath, (err, data) => {
            if (err) throw err;

            let dataJson = JSON.parse(data);

            res.send(dataJson);
        });
    });

};