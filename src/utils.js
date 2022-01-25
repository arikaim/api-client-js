'use strict';
/**
 * Arikaim CMS api client
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
*/

global.isFunction = function(variable) {
    return (typeof variable === 'function');
}

global.callFunction = function(function_name,params) {
    if (isFunction(function_name) == true) {
        return function_name(params);
    }
    return null;
}

global.isJSON = function(json) {
    try {
        var json = JSON.stringify(json);
        var json = JSON.parse(json);
        if (typeof(json) == 'string') {
            if (json.length == 0) return false;
        }
    }
    catch (e) {
        return false;
    }

    return true;
}

global.getObjectProperty = function(path, obj) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}

global.getValue = function(path,obj,defaultValue) {
    var val = getObjectProperty(path,obj);
    return (val == null) ? defaultValue : val;      
}

global.getDefaultValue = function(variable, defaultValue) {
    return (isEmpty(variable) == true) ? defaultValue : variable;      
}

global.isEmpty = function(variable) {
    if (variable === undefined) return true;
    if (variable === null) return true;
    if (variable === "") return true;

    return false;
}

global.isObject = function(variable) {
    return (typeof variable === 'object');
}

global.isArray = function(variable) {
    return (isEmpty(variable) == true) ? false : (variable.constructor === Array);   
}
