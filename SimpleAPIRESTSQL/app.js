const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const express = require('express'),
    bodyParser = require('body-parser');

const app = express();

const config = {
    userName: 'kievdevlogin',
    password: 'KievDev12345678',
    server: 'ec-ticket.database.windows.net',

    // If you're on Windows Azure, you will need this:
    options: {
        database: 'ticketflow_dev',
        encrypt: true,
    }
};


app.set('port', process.env.PORT || 3333);


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json("Home page");
    res.end();
});


app.get('/test', (req, res) => {

    const connection = new Connection(config);

    connection.on('connect', function (err) {
            if (err) {
                console.log('error : ' + err);
                throw err;
            } else {
                console.log("Connected to Database...");
                executeStatement(connection, res);
            }
        }
    );
});


/**
 *
 */
function executeStatement(connection, res) {
    let newdata = [],
        dataset = {};

    const query = `
        SELECT
           UserID, 
           FirstName,
           LastName,
           Email,
           IsManager,
           CanWrite,
           isAnimator,
           CanWriteText,
           IsOnlineTest,
           IsMedicalTranslator,
           WriterSkills,
           exerciseSkills,
           IsunderProCo,
           IsProjectCoordinator,
           isCoordinator,
           IsMedical,
           Dutch,
           IsWriter,
           isExercises,
           MaWriter
        FROM
            hdUsers
    `;

    request = new Request(query, function (err, rowCount) {
        if (err) {
            console.err(`err: ${err}`);
            throw err;
        } else {

            console.log(`Send data from DataBase (rowCount: ${rowCount})...`);

            res.send(newdata);
            res.end();
        }

        connection.close();

        console.log(`Connection close to DataBase`);
    });

    request.on('row', function (columns, index, array) {
        columns.forEach(function (column) {
            dataset[column.metadata.colName] = column.value;
        });

        newdata.push(dataset);

        dataset = {};
    });

    connection.execSql(request);
}

app.listen(app.get('port'), () => {
    console.log(`Server start on port ${app.get('port')}`);
});
