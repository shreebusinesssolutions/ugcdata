var mysql = require("mysql");
var logger = require("./function/logger.func");
var dba = require("./global/dba.global");
var https = require('https');

https.get('https://sheets.googleapis.com/v4/spreadsheets/1gpEvB_KxXoF1E06FW7EjkXgqK_TM56EVC1lto7GaVFw/values/Query22!A2:H?key=AIzaSyDw7EtIbTGxIk3aXtZWgt0bnNcsHlB2yG8', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        console.log(JSON.parse(data));
    });

}).on("error", (err) => {
    console.log("Error: " + err);
});