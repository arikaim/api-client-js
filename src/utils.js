'use strict';
/**
 * Arikaim CMS api client
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
*/

export function isFunction(variable) {
    return (typeof variable === 'function');
}

export function callFunction(function_name,params) {
    if (isFunction(function_name) == true) {
        return function_name(params);
    }
    return null;
}

export function isJSON(json) {
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

export function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key,object[key]));

    return formData;
}

export function getObjectProperty(path, obj) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}

export function getValue(path,obj,defaultValue) {
    var val = getObjectProperty(path,obj);
    return (val == null) ? defaultValue : val;      
}

export function getDefaultValue(variable, defaultValue) {
    return (isEmpty(variable) == true) ? defaultValue : variable;      
}

export function isEmpty(variable) {
    if (variable === undefined) return true;
    if (variable === null) return true;
    if (variable === "") return true;

    return false;
}

export function isObject(variable) {
    return (typeof variable === 'object');
}

export function isArray(variable) {
    return (isEmpty(variable) == true) ? false : (variable.constructor === Array);   
}
