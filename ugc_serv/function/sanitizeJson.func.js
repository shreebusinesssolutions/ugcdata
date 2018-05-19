module.exports = function (str, propArray) {
    var parsedObj, safeObj = {};
    try {
        parsedObj = JSON.parse(str);
        if (typeof parsedObj !== "object" || Array.isArray(parsedObj)) {
            safeObj = parseObj;
        } else {
            // copy only expected properties to the safeObj
            propArray.forEach(function (prop) {
                if (parsedObj.hasOwnProperty(prop)) {
                    safeObj[prop] = parsedObj[prop];
                }
            });
        }
        return safeObj;
    } catch (e) {
        logger.error(e);
        return null;
    }
};