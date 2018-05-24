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
                var sql = "";
                var passed = 0, failed = 0, number = 0;
                for (var i = 0; i < data_obj.length; i++) {
                    sql = "INSERT INTO plan_11_12_paid (entry_num, file_num, master_file_num, college_id, year, paid, uc, scheme_id, subscheme_id, plan_files) ";
                    sql += "SELECT ";
                    sql += (i + 1) + " AS entry_num, ";
                    sql += (data_obj[i][0] ? ("'" + data_obj[i][0].replace(/'/g, "\\'") + "' ") : "null ") + "AS file_num, ";
                    sql += "'" + data_obj[i][1].replace(/'/g, "\\'") + "' AS master_file_num, ";
                    sql += "'" + data_obj[i][2].replace(/'/g, "\\'").replace(/\s/g, '').toUpperCase() + "' AS college_id, ";
                    sql += "'" + data_obj[i][7].replace(/'/g, "\\'").replace(/\s/g, '') + "' AS year, ";
                    sql += data_obj[i][8].replace(/'/g, "\\'").replace(/\s/g, '') + " AS paid, ";
                    sql += (data_obj[i][9] ? (data_obj[i][9].replace(/'/g, "\\'").replace(/\s/g, '') + " ") : "null ") + "AS uc, ";
                    sql += "'" + data_obj[i][10].replace(/'/g, "\\'").replace(/\s/g, '').toUpperCase() + "' AS scheme_id, ";
                    sql += "subscheme_id, ";
                    sql += "'" + data_obj[i][13].replace(/'/g, "\\'") + "' AS plan_files ";
                    sql += "FROM sub_scheme ";
                    sql += "WHERE subscheme_name = '" + data_obj[i][12] + "'";
                    //console.log(sql)
                    db_conn.query(sql, function (err, result, fields) {
                        number++;
                        if (err) {
                            failed++;
                            logger.error(err, { stat: { failed: failed, passed: passed }, number: number });
                        } else {
                            passed++;
                            logger.log("Query OK", { stat: { failed: failed, passed: passed }, number: number });
                        }
                    });
                }
            });

        }).on("error", (err) => {
            logger.error(err);
        });
    }
});