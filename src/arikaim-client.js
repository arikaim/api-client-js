'use strict';
/**
 *  Arikaim CMS api client
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  http://www.arikaim.com
*/

import axios from 'axios';
import { writeFileSync, createReadStream } from 'fs';
import { isEmpty, isObject } from '@arikaim/client/utils';

/**
 *  Arikaim client class
 */
export class ArikaimClient {
    #axios;
    #apiEndpoint;
    #accessToken;
    #headers;

    constructor(apiEndpointUrl, apiToken, timeout, headers) {
        this.#headers = {};
        this.#apiEndpoint = apiEndpointUrl;
        timeout = (isEmpty(timeout) == true) ? 3000 : timeout;

        if (isObject(headers) == true) {
            this.#headers = headers;           
        }
        this.#headers['Content-Type'] = 'application/json';
        this.token = apiToken;

        this.#axios = axios.create({
            baseURL: apiEndpointUrl,
            timeout: timeout           
        });

        // disable errors for resposne with code 400
        this.#axios.interceptors.response.use(function (response) {
            return response;
        },function (error) {    
            if (error.response) {
                if (parseInt(error.response.status) >= 400) {
                    return Promise.resolve(error.response);
                }
            } 
            
            return Promise.reject(error);
        });
    }

    setHeader(key,value) {
        this.#headers[key] = value;
    }

    deleteHeader(key) {
        delete this.#headers[key];
    }

    set endpoint(value) {
        this.#apiEndpoint = value;
    }

    get endpoint() {
        return this.#apiEndpoint;
    }

    set token(value) {
        this.#accessToken = value;
        if (isEmpty(value) == false) {
            this.#headers.Authorization = value;
        } else {
            delete this.#headers.Authorization;
        }       
    }

    get token() {
        return this.#accessToken;
    }

    get axios() {
        return this.#axios;
    }

    request(method, path, data, file) {
        if (method == 'get' && isEmpty(data) == false) {
            this.#headers.Params = JSON.stringify(data);
        }

        var config = {
            method: method,
            url: path,
            headers: this.#headers
        };

        if (isEmpty(data) == false && method != 'delete') {
            config.data = data;
        }

        if (method == 'delete') {
            config.params = data;
        }

        if (isEmpty(file) == false) {
            // upload file
            if (isObject(data) == false) {
                data = {};
            } 
            data[file.key] = createReadStream(file.fileName)
            // set config
            config.headers['Content-Type'] = "multipart/form-data";
            config.data = data;
        }

        return this.#axios(config).then(function (response) {
            // response.data;           
            if (ArikaimClient.isSuccess(response.data) == false) {
                return Promise.reject(response.data);     
            } 
            
            return Promise.resolve(response.data);
        }).catch(function (error) {
            // error          
            return Promise.reject(error);     
        });      
    }

    static isSuccess(response) {
        return (response.status != 'error') 
    }

    get(path, data) {
        return this.request('get',path,data);
    }

    post(path, data, file) {
        return this.request('post',path,data,file);
    }

    put(path, data, file) {
        return this.request('put',path,data,file);
    }

    patch(path, data) {
        return this.request('patch',path,data);
    }

    options(path, data) {
        return this.request('options',path,data);
    }

    head(path, data) {
        return this.request('head',path,data);
    }

    delete(path, params) {
        return this.request('delete',path,params);
    }

    upload(method, path, fileName, fieldKey, data) {
        return this.request(method,path,data,{
            key: fieldKey,
            fileName: fileName
        });
    }

    saveEncodedFile(data, fileName) {
        if (Buffer.from(data,'base64').toString('base64') === data) {
            data = Buffer.from(data,'base64');
        }
       
        return writeFileSync(fileName,data);
    }
}
