'use strict';

const http = require('http');
const querystring = require('querystring');
const debug = require('debug')('node-telldus-local:TelldusLocalClient');

const Constants = require('./Constants.js');


let instance = null;

class TelldusLocalClient {
    constructor(options) {
        instance = this;

        if (!options) {
            debug('Configuration is missing!');
            process.exit(1);
        }
        this.options = options;

        return this;
    }

    static getInstance() {
        return instance;
    }

    formRequest(method, path, requestBody) {
        const httpOptions = this.createHttpOptions(method, path, 'application/x-www-form-urlencoded', null);
        // debug('httpOptions: %O', httpOptions);
        return this.request(httpOptions, requestBody);
    }

    jsonRequest(method, path, requestBody) {
        if (!this.options.accessToken) {
            return Promise.reject(new Error('Access token is missing.'));
        } else {
            const httpOptions = this.createHttpOptions(method, path, 'application/json', this.options.accessToken);
            // debug('httpOptions: %O', httpOptions);
            return this.request(httpOptions, requestBody);
        }
    }

    createHttpOptions(method, path, contentType, accessToken) {
        let headers = {};

        if (method === 'POST' || method === 'PUT') {
            headers['Content-Type'] = contentType;
        }

        if (accessToken !== null) {
            headers['Authorization'] = 'Bearer ' + this.options.accessToken;
        }

        return {
            method: method,
            host: this.options.hostname,
            port: 80,
            path: path,
            headers: headers
        };
    }

    request(httpOptions, requestBody) {
        return new Promise((resolve, reject) => {
            const req = http.request(httpOptions, (response) => {
                const expectedStatusCode = {
                    GET: [200],
                    PUT: [200],
                    POST: [200, 201, 202],
                    DELETE: [200]
                }[httpOptions.method];

                var body = '';
                response.on('data', (chunk) => {
                    body += chunk;
                });
                response.on('end', () => {
                    let result = {};
                    try {
                        result = JSON.parse(body);
                    } catch (ex) {
                        return reject(new Error('Parse error'));
                    }

                    if (expectedStatusCode.indexOf(response.statusCode) === -1) {
                        return reject(new Error('HTTP response ' + response.statusCode), response.statusCode, result);
                    }

                    resolve(result);
                });
            });

            req.on('error', (e) => {
                return reject(e);
            });

            if (requestBody !== null) {
                req.write(requestBody);
            }

            req.end();
        });
    }

    getRequestToken(applicationName) {
        const body = querystring.stringify({
            app: applicationName
        });
        return this.formRequest('PUT', '/api/token', body);
    }

    /*
     * Device
     */

    getDevices() {
        return this.jsonRequest(
            'GET',
            '/api/devices/list?' + querystring.stringify({
                supportedMethods: Constants.SUPPORTED_METHODS,
                extras: Constants.EXTRAS
                //includeIgnored: 1 /* Set to 1 to include ignored devices */
            }),
            null);
    }

    getDevice(id) {
        return this.jsonRequest(
            'GET',
            '/api/device/info?' + querystring.stringify({
                id: id,
                supportedMethods: Constants.SUPPORTED_METHODS,
                extras: Constants.EXTRAS
            }),
            null);
    }

    deviceSetName(id, name) {
        return this.jsonRequest(
            'GET',
            '/api/device/setName?' + querystring.stringify({
                id: id,
                name: name
            }),
            null);
    }

    deviceBell(id) {
        return this.jsonRequest(
            'GET',
            '/api/device/bell?' + querystring.stringify({
                id: id
            }),
            null);
    }

    deviceTurnOff(id) {
        return this.jsonRequest(
            'GET',
            '/api/device/turnOff?' + querystring.stringify({
                id: id
            }),
            null);
    }

    deviceTurnOn(id) {
        return this.jsonRequest(
            'GET',
            '/api/device/turnOn?' + querystring.stringify({
                id: id
            }),
            null);
    }

    deviceDown(id) {
        return this.jsonRequest(
            'GET',
            '/api/device/down?' + querystring.stringify({
                id: id
            }),
            null);
    }

    deviceUp(id) {
        return this.jsonRequest(
            'GET',
            '/api/device/up?' + querystring.stringify({
                id: id
            }),
            null);
    }

    deviceLearn(id) {
        return this.jsonRequest(
            'GET',
            '/api/device/learn?' + querystring.stringify({
                id: id
            }),
            null);
    }

    deviceStop(id) {
        return this.jsonRequest(
            'GET',
            '/api/device/stop?' + querystring.stringify({
                id: id
            }),
            null);
    }

    deviceDim(id, level) {
        return this.jsonRequest(
            'GET',
            '/api/device/dim?' + querystring.stringify({
                id: id,
                level: level
            }),
            null);
    }

    deviceCommand(id, method, value) {
        return this.jsonRequest(
            'GET',
            '/api/device/command?' + querystring.stringify({
                id: id,
                method: method,
                value: value
            }),
            null);
    }

    /*
     * Sensor
     */

    getSensors() {
        return this.jsonRequest(
            'GET',
            '/api/sensors/list?' + querystring.stringify({
                /* Set to 1 to include ignored devices */
                //includeIgnored: 1,
                /* Set to 1 to include the last value for each sensor */
                includeValues: 1,
                /* Set to 1 to include the scale types for values (only valid if combined with 'includeValues'), this will return values in a separate list */
                includeScale: 1
            }),
            null);
    }

    getSensor(id) {
        return this.jsonRequest(
            'GET',
            '/api/sensor/info?' + querystring.stringify({
                id: id
            }),
            null);
    }

    sensorSetName(id, name) {
        return this.jsonRequest(
            'GET',
            '/api/sensor/setName?' + querystring.stringify({
                id: id,
                name: name
            }),
            null);
    }


}

module.exports = TelldusLocalClient;
