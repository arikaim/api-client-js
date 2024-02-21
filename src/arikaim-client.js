'use strict';
/**
 *  Arikaim CMS api client
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  http://www.arikaim.com
*/

import merge from 'deepmerge';
import axios from 'axios';

import { isEmpty } from '@arikaim/arikaim-client/utils';

/**
 *  Arikaim client class
 */
export class ArikaimClient {
    #axios;
    #apiEndpoint;
    #accessToken;
    #headers;

    constructor(apiEndpointUrl, apiToken, timeout, headers) {
        this.#headers = { 
            'Content-Type': 'application/json' 
        };
        this.token = apiToken;
        this.#apiEndpoint = apiEndpointUrl;
        timeout = (isEmpty(timeout) == true) ? 3000 : timeout;

        if (isEmpty(headers) == false) {
            this.#headers = merge( this.#headers,headers);
        }

        this.#axios = axios.create({
            baseURL: apiEndpointUrl,
            timeout: timeout           
        });

        // disable errors for resposne with code 400
        this.#axios.interceptors.response.use(function (response) {
            return response;
        },function (error) {      
            if (error.response.status == 400) {
                return Promise.resolve(error.response);
            }
            
            return Promise.reject(error);
        });
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
        }       
    }

    get token() {
        return this.#accessToken;
    }

    get axios() {
        return this.#axios;
    }

    request(method, url, data) {
        if (method == 'get' && isEmpty(data) == false) {
            this.#headers.Params = JSON.stringify(data);
        }

        var config = {
            method: method,
            url: url,
            headers: this.#headers
        };

        if (isEmpty(data) == false && method != 'delete') {
            config.data = data;
        }

        if (method == 'delete') {
            config.params = data;
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

    get(url, data) {
        return this.request('get',url,data);
    }

    post(url, data) {
        return this.request('post',url,data);
    }

    put(url, data) {
        return this.request('put',url,data);
    }

    patch(url, data) {
        return this.request('patch',url,data);
    }

    options(url, data) {
        return this.request('options',url,data);
    }

    head(url, data) {
        return this.request('head',url,data);
    }

    delete(url, params) {
        return this.request('delete',url,params);
    }
}
