exports.log = function(material, meta = {}) {
    var fs = require('fs');
    var moment = require('moment');
    var time = moment().utc().format("DD MMM YYYY kk:mm:ss.SSS") + "GMT";
    fs.appendFile("./logs/log.log", time + " -- " + material + (meta?(" " + JSON.stringify(meta)):"") + "\n", function(err) {
        if(err)
            throw err;
    });
};

exports.time = function(material, meta = {}) {
    var fs = require('fs');
    var moment = require('moment');
    var time = moment().utc().format("DD MMM YYYY kk:mm:ss.SSS") + "GMT";
    fs.appendFile("./logs/time.log", time + " -- " + material + (meta?(" " + JSON.stringify(meta)):"") + "\n", function(err) {
        if(err)
            throw err;
    });
};

exports.error = function(material, meta = {}) {
    var fs = require('fs');
    var moment = require('moment');
    var time = moment().utc().format("DD MMM YYYY kk:mm:ss.SSS") + "GMT";
    fs.appendFile("./logs/error.log", time + " -- " + material + (meta?(" " + JSON.stringify(meta)):"") + "\n", function(err) {
        if(err)
            throw err;
    });
    fs.appendFile("./logs/log.log", time + " -- [ERROR] " + material + (meta?(" " + JSON.stringify(meta)):"") + "\n", function(err) {
        if(err)
            throw err;
    });
};

exports.info = function(material, meta = {}) {
    var fs = require('fs');
    var moment = require('moment');
    var time = moment().utc().format("DD MMM YYYY kk:mm:ss.SSS") + "GMT";
    fs.appendFile("./logs/info.log", time + " -- " + material + (meta?(" " + JSON.stringify(meta)):"") + "\n", function(err) {
        if(err)
            throw err;
    });
};