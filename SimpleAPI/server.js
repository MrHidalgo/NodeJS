/**
 * Require main package
 *
 * @type {*|createApplication}
 */
const express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs');

/**
 * Additional files: GET, DELETE, POST, PUT
 */
const getData = require('./lib/appGET'),
    getDataId = require('./lib/appGET_id'),
    postData = require('./lib/appPOST'),
    putData = require('./lib/appPUT'),
    deleteData = require('./lib/appDELETE');

/**
 * Create json parser for data and express JS application
 */
const app = express(),
    jsonParser = bodyParser.json();


/**
 * Set server port
 */
app.set('port', process.env.PORT || 3000);

/**
 * Path to the static files
 */
app.use(express.static(__dirname + '/public'));


/**
 * Get data list
 */
getData.GetData(app, fs, './data/user.json');

/**
 * Get user to the edit
 */
getDataId.GetDataId(app, fs, './data/user.json');

/**
 * Send data from JSON
 */
postData.PostData(app, fs, jsonParser, './data/user.json');

/**
 * Update data from JSON
 */
putData.PutData(app, fs, jsonParser, './data/user.json');

/**
 * Delete data from JSON
 */
deleteData.DeleteData(app, fs, './data/user.json');


/**
 * Start to listen server
 */
app.listen(app.get('port'), () => {
    console.log(`Server start on port ${app.get('port')}`);
});
