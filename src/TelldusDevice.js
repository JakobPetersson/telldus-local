'use strict';

const TelldusAccessory = require('./TelldusAccessory.js');
const Constants = require('./Constants');
const TelldusLocalClient = require('./TelldusLocalClient.js');

class TelldusDevice extends TelldusAccessory {
    constructor(data) {
        super('device', data);
    }

    /*
     *
     */

    update() {
        return this.getInfo();
    }

    getInfo() {
        return TelldusLocalClient.getInstance().getDevice(this.getId()).then(data => {
            this.updateApiData(data);
            return this;
        });
    }

    //private
    setInternalState(data) {
        this.methods = data.methods;
        this.state = data.state || null;
        this.status = Constants.METHODS[data.state] || 'off';
        this.statevalue = data.statevalue || null;
        //extras
        this.transport = data.transport || null;
    }

    /*
     * TODO: Ensure these are run when allowed to?
     */

    setName(name) {
        return TelldusLocalClient.getInstance().deviceSetName(this.getId(), name).then(() => {
            //this.name = name; // TODO: Should we wait for name to be updated by API, then return?
            return this;
        });
    }

    setStatus(status) {
        if (Constants.COMMANDS[status]) {
            this.status = status;
            this.state = Constants.COMMANDS[status];
        }
    }

    bell() {
        return TelldusLocalClient.getInstance().deviceBell(this.id).then(() => {
            this.setStatus('bell');
            return this;
        });
    }

    turnOff() {
        return TelldusLocalClient.getInstance().deviceTurnOff(this.id).then(() => {
            this.setStatus('off');
            return this;
        });
    }

    turnOn() {
        return TelldusLocalClient.getInstance().deviceTurnOn(this.id).then(() => {
            this.setStatus('on');
            return this;
        });
    }

    down() {
        return TelldusLocalClient.getInstance().deviceDown(this.id).then(() => {
            this.setStatus('down');
            return this;
        });
    }

    up() {
        return TelldusLocalClient.getInstance().deviceUp(this.id).then(() => {
            this.setStatus('up');
            return this;
        });
    }

    learn() {
        return TelldusLocalClient.getInstance().deviceLearn(this.id).then(() => {
            return this;
        });
    }

    stop() {
        return TelldusLocalClient.getInstance().deviceStop(this.id).then(() => {
            this.setStatus('off');
            return this;
        });
    }

    dim(level) {
        return TelldusLocalClient.getInstance().deviceDim(this.id, level).then(() => {
            this.setStatus('dim');
            return this;
        });
    }

    command(method, value) {
        return TelldusLocalClient.getInstance().deviceCommand(this.id, method, value).then(() => {
            return this;
        });
    }

}

module.exports = TelldusDevice;
