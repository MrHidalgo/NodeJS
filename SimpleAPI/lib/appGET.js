exports.GetData = (app, fs, dataPath) => {

    app.get('/api/users/', (req, res) => {
        fs.readFile(dataPath, (err, data) => {
            if (err) throw err;

            let content = JSON.parse(data);

            res.send(content);
        });
    });

};