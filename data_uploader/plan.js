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
                var sql = "";
                var passed = 0, failed = 0, number = 0;
                for (var i = 0; i < data_obj.length; i++) {
                    sql = "INSERT INTO college (file_num, master_file_num, college_id, year, paid, uc, scheme_id, subscheme_name, plan_files) ";
                    sql += "VALUES (";
                    sql += (data_obj[i][0] ? ("'" + data_obj[i][0].replace(/'/g, "\\'") + "', ") : "null, ");
                    sql += "'" + data_obj[i][1].replace(/'/g, "\\'") + "', ";
                    sql += "'" + data_obj[i][2].replace(/'/g, "\\'") + "', ";
                    sql += "'" + data_obj[i][3].replace(/'/g, "\\'").toUpperCase() + "', ";
                    sql += data_obj[i][4] + ", ";
                    sql += (data_obj[i][5] ? (data_obj[i][5].replace(/'/g, "\\'") + ", ") : "null, ");
                    sql += "'" + data_obj[i][6].replace(/'/g, "\\'").toUpperCase() + "', ";
                    sql += "'" + data_obj[i][7].replace(/'/g, "\\'") + "', ";
                    sql += "'" + data_obj[i][8].replace(/'/g, "\\'") + "'";
                    sql += "); ";
                    db_conn.query(sql, function (err, result, fields) {
                        number++;
                        if (err) {
                            logger.error(err, { stat: { failed: failed, passed: passed }, number: number });
                            failed++;
                        } else {
                            logger.log("Query OK", { stat: { failed: failed, passed: passed }, number: number });
                            passed++;
                        }
                    });
                }
            });

        }).on("error", (err) => {
            logger.error(err);
        });
    }
});