var mysql = require("mysql");
var logger = require("./function/logger.func");
var dba = require("./global/dba.global");
var https = require('https');
var moment = require('moment');
db_conn = mysql.createConnection({
    host: dba.servername,
    user: dba.username,
    password: dba.password,
    database: dba.dbname,
    multipleStatements: true
});

db_conn.connect(function (err) {
    if (err)
        logger.error(err);
    else {
        https.get('https://sheets.googleapis.com/v4/spreadsheets/1mnG6XmP72kldNbl-k58BCnYkq9E5OwFKH1qGvn198xU/values/XIANDXIIPLAN!A2:O?key=AIzaSyDw7EtIbTGxIk3aXtZWgt0bnNcsHlB2yG8', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                var data_obj = JSON.parse(data).values;
                console.log(data_obj.length);
                // var sql = "";
                // var passed = 0, failed = 0;
                // for (var i = 0; i < data_obj.length; i++) {
                //     sql = "INSERT INTO college (college_id, college_name, addr1, addr2, pin, pfms_unique_code, naac_validity, bsr_intrest_paid_and_intrest) ";
                //     sql += "VALUES (";
                //     sql += "'" + data_obj[i][0].replace(/'/g, "\\'") + "', ";
                //     sql += "'" + data_obj[i][1].replace(/'/g, "\\'") + "', ";
                //     sql += "'" + data_obj[i][2].replace(/'/g, "\\'") + "', ";
                //     sql += (data_obj[i][3] ? ("'" + data_obj[i][3].replace(/'/g, "\\'") + "', ") : "null, ");
                //     sql += (data_obj[i][4] ? ("" + data_obj[i][4].replace(/\s/g, "") + ", ") : "null, ");
                //     sql += (data_obj[i][5] ? ("'" + data_obj[i][5].replace(/'/g, "\\'") + "', ") : "null, ");
                //     sql += (data_obj[i][6] ? ("'" + moment(data_obj[i][6]).format("YYYY-MM-DD") + "', ") : "null, ");
                //     sql += (data_obj[i][7] ? ("'" + data_obj[i][7].replace(/'/g, "\\'") + "'") : "null");
                //     sql += "); ";
                //     var college_id = data_obj[i][0]
                //     db_conn.query(sql, function (err, result, fields) {
                //         if (err) {
                //             logger.error(err, result);
                //             failed++;
                //         } else {
                //             logger.log("Query OK", result);
                //             passed++;
                //         }
                //         console.log({ failed: failed, passed: passed });
                //     });
                // }
            });

        }).on("error", (err) => {
            logger.error(err);
        });
    }
});