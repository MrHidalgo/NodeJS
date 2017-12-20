const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const config = {
    userName: 'kievdevlogin',
    password: 'KievDev12345678',
    server: 'ec-ticket.database.windows.net',

    // If you're on Windows Azure, you will need this:
    options: {
        database: 'ticketflow_dev',
        encrypt: true
    }
};

const connection = new Connection(config);


/**
 *
 */
connection.on('connect', function(err) {
        if (err) {
            console.log('error : '+err);
        } else {
            console.log("Connected to Database");
            executeStatement();
        }
    }
);


/**
 *
 */
function executeStatement() {
    request = new Request("SELECT * FROM hdUsers", function(err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }
    });

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log(column.value);
        });
    });

    connection.execSql(request);
}