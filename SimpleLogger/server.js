const express   = require('express'),
    fs          = require('fs'),
    app         = express();

const fileLoggerName = 'serverLogger.log';

app.use((req, res, next) => {
    const now = new Date();

    const hour  = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds();

    const data = `${hour}:${minutes}:${seconds} :: \n${req.url}\n${req.method}\n${req.headers['user-agent']}`;

    fs.appendFile(fileLoggerName, data + '\n');
    next();
    // watch file command real time: tail -f 'filename'
});

app.get('/', (req, res) => {
    res.send("Home page");
});
app.get('/about', (req, res) => {
    res.send("About page");
});
app.get('/contacts', (req, res) => {
    res.send("Contacts page");
});

app.listen(3000, () => {
    console.log(`Server start on port 3000`);
});