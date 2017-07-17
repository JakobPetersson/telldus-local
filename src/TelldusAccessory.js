'use strict';

class TelldusAccessory {

    constructor(type, apiData) {
        this.updateApiData(apiData);

        const id = apiData.id;
        if (!Number.isInteger(id)) {
            throw new Error('Telldus accessory id is not valid');
        }
        this._id = id;

        if (!type) {
            throw new Error('Telldus accessory type is not valid');
        }
        this._type = type;
    }

    /*
     * API
     */

    updateApiData(apiData) {
        if (!apiData) {
            throw new Error('Telldus Local API data is not valid');
        }
        this._apiData = apiData;
    }

    getApiProperty(propertyName) {
        return this._apiData[propertyName];
    }

    /*
     * Common properties
     */

    getId() {
        return this._id;
    }

    getType() {
        return this._type;
    }

    getName() {
        return this.getApiProperty('name');
    }

    getModel() {
        return this.getApiProperty('model');
    }

}

module.exports = TelldusAccessory;
