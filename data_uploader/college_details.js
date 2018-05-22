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
        https.get('https://sheets.googleapis.com/v4/spreadsheets/1gpEvB_KxXoF1E06FW7EjkXgqK_TM56EVC1lto7GaVFw/values/Query22!A2:H?key=AIzaSyDw7EtIbTGxIk3aXtZWgt0bnNcsHlB2yG8', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                var sql = "";
                var passed = 0, failed = 0;
                var college_data = JSON.parse(data).values;
                for (var i = 0; i < college_data.length; i++) {
                    sql = "INSERT INTO college (college_id, college_name, addr1, addr2, pin, pfms_unique_code, naac_validity, bsr_intrest_paid_and_intrest) ";
                    sql += "VALUES (";
                    sql += "'" + college_data[i][0].replace(/'/g, "\\'") + "', ";
                    sql += "'" + college_data[i][1].replace(/'/g, "\\'") + "', ";
                    sql += "'" + college_data[i][2].replace(/'/g, "\\'") + "', ";
                    sql += (college_data[i][3] ? ("'" + college_data[i][3].replace(/'/g, "\\'") + "', ") : "null, ");
                    sql += (college_data[i][4] ? ("" + college_data[i][4].replace(/\s/g, "") + ", ") : "null, ");
                    sql += (college_data[i][5] ? ("'" + college_data[i][5].replace(/'/g, "\\'") + "', ") : "null, ");
                    sql += (college_data[i][6] ? ("'" + moment(college_data[i][6]).format("YYYY-MM-DD") + "', ") : "null, ");
                    sql += (college_data[i][7] ? ("'" + college_data[i][7].replace(/'/g, "\\'") + "'") : "null");
                    sql += "); ";
                    var college_id = college_data[i][0]
                    db_conn.query(sql, function (err, result, fields) {
                        if (err) {
                            logger.error(err);
                            failed++;
                        } else {
                            logger.log("Query OK");
                            passed++;
                        }
                        if (i == college_data.length)
                            console.log({ failed: failed, passed: passed });
                    });
                }
                // db_conn.query(sql, function (err, result, fields) {
                //     if (err) {
                //         logger.error(err);
                //     } else {
                //         logger.log(result);
                //     }
                // });
            });

        }).on("error", (err) => {
            logger.error(err);
        });
    }
});