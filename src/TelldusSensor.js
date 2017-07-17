'use strict';

const TelldusAccessory = require('./TelldusAccessory.js');
const TelldusLocalClient = require('./TelldusLocalClient.js');

class TelldusSensor extends TelldusAccessory {
    constructor(data) {
        super('sensor', data);
    }

    /*
     * Returns sensor data
     * If name is undefined, all data is returned.
     * Otherwise the specified data value is returned.
     */
    getAllData() {
        return this.getApiProperty('data');
    }

    getData(name) {
        return this.getApiProperty('data').find(dataEntry => {
            return dataEntry.name === name;
        });
    }

    update() {
        return this.getInfo();
    }

    getInfo() {
        return TelldusLocalClient.getInstance().getSensor(this.getId()).then(data => {
            this.updateApiData(data);
            return this;
        });
    }

    setName(name) {
        return TelldusLocalClient.getInstance().sensorSetName(this.getId(), name).then(() => {
            this.name = name;
            return this;
        });
    }

}

module.exports = TelldusSensor;
