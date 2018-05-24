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
        https.get('https://sheets.googleapis.com/v4/spreadsheets/1srFk8uJAjFwLEkdVevSZw5ncMs1DFurhWojsSWZAXTY/values/XIPLANPENDING!A2:M11?key=AIzaSyDw7EtIbTGxIk3aXtZWgt0bnNcsHlB2yG8', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                var data_obj = JSON.parse(data).values;
                var sql = "";
                var passed = 0, failed = 0, number = 0;
                for (var i = 0; i < data_obj.length; i++) {
                    sql = "INSERT INTO plan_11_pending (entry_num, auto_num, college_id, file_num, remarks, master_file_num, sanction_date, paid, uc, pending_uc, scheme_id, subscheme_id, year, case_cleared) ";
                    sql += "SELECT ";
                    sql += (i + 1) + " AS entry_num, ";
                    sql += "'" + data_obj[i][0] + "' AS auto_num, ";
                    sql += "'" + data_obj[i][1].toUpperCase() + "' AS college_id, ";
                    sql += "'" + data_obj[i][2].replace(/\s/g, '') + "' AS file_num, ";
                    sql += (data_obj[i][3] ? ("'" + data_obj[i][3].replace(/'/g, "\\'") + "' ") : "null ") + "AS remarks, ";
                    sql += (data_obj[i][4] ? ("'" + data_obj[i][4].replace(/\s/g, '') + "' ") : "null ") + "AS master_file_num, ";
                    sql += (data_obj[i][5] ? ("'" + moment(data_obj[i][5]).format("YYYY-MM-DD") + " ") : "null ") + "AS sanction_date, ";
                    sql += (data_obj[i][6] ? (data_obj[i][6] + " ") : "null ") + "AS paid, ";
                    sql += (data_obj[i][7] ? (data_obj[i][7] + " ") : "null ") + "AS uc, ";
                    sql += (data_obj[i][8] ? (data_obj[i][8] + " ") : "null ") + "AS pending_uc, ";
                    sql += "'" + data_obj[i][9].toUpperCase() + "' AS scheme_id, ";
                    sql += "'" + (data_obj[i][10] == "CD(11)SC" ? "CDSC" : data_obj[i][10]) + "' AS subscheme_id, ";
                    sql += (data_obj[i][11] ? ("'" + data_obj[i][11] + "' ") : "null ") + "AS year, ";
                    sql += (data_obj[i][12] ? "1 " : "0 ") + "AS case_cleared;"
                    console.log(sql);
                    // db_conn.query(sql, function (err, result, fields) {
                    //     number++;
                    //     if (err) {
                    //         failed++;
                    //         logger.error(err, { stat: { failed: failed, passed: passed }, number: number });
                    //     } else {
                    //         passed++;
                    //         logger.log("Query OK", { stat: { failed: failed, passed: passed }, number: number });
                    //     }
                    // });
                }
            });

        }).on("error", (err) => {
            logger.error(err);
        });
    }
});