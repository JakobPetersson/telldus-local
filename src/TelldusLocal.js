'use strict';

const TelldusLocalClient = require('./TelldusLocalClient.js');
const TelldusDevice = require('./TelldusDevice.js');
const TelldusSensor = require('./TelldusSensor.js');

const debug = require('debug')('node-telldus-local');

class TelldusLocal {
    constructor(options) {
        if (!options) {
            debug('Configuration is missing!');
            process.exit(1);
        }
        this.options = options;

        const clientOptions = {
            hostname: this.options.hostname,
            accessToken: this.options.accessToken
        };
        this.telldusLocalClient = new TelldusLocalClient(clientOptions);
    }

    /*
     * Accessories: Devices and Sensors
     */

    getAccessories(complement = false) {
        return Promise.all([this.getDevices(complement), this.getSensors(complement)]).then((accessories) => {
            let result = [];
            accessories.map((list) => result = result.concat(list));
            return result;
        });
    }

    /*
     * Device
     */

    getDevices(complement = false) {
        const allDevices = this.telldusLocalClient.getDevices().then(response => {
            return response.device.map((deviceData) => new TelldusDevice(deviceData));
        });

        if (complement === false) {
            return allDevices;
        }

        return allDevices.then((devices) => {
            let results = [];
            for (let device of devices) {
                results.push(device.getInfo());
            }
            return Promise.all(results);
        });
    }

    getDevice(id) {
        return this.telldusLocalClient.getDevice(id).then(data => {
            return new TelldusDevice(data);
        });
    }

    /*
     * Sensor
     */

    getSensors(complement = false) {
        const allSensors = this.telldusLocalClient.getSensors().then(response => {
            return response.sensor.map((sensorData) => new TelldusSensor(sensorData));
        });

        if (complement === false) {
            return allSensors;
        }

        return allSensors.then((sensors) => {
            let results = [];
            for (let sensor of sensors) {
                results.push(sensor.getInfo());
            }
            return Promise.all(results);
        });
    }

    getSensor(id) {
        return this.telldusLocalClient.getSensor(id).then(sensorData => {
            return new TelldusSensor(sensorData);
        });
    }
}

module.exports = TelldusLocal;
