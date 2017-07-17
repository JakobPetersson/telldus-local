const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should;
const TelldusDevice = require('../src/TelldusDevice.js');

describe('TelldusDevice', function() {
    describe('When constructor called without data', function() {
        it('should throw an error', function() {
            expect(function() {
                new TelldusDevice();
            }).to.throw();
        });
    });

    describe('When created with valid data', function() {
        before(function() {
            const testData = {
                id: 63,
                methods: 35,
                model: 'n/a',
                name: 'Device Name',
                protocol: '433',
                state: 2,
                statevalue: '',
                transport: '433',
                type: 'device'
            };
            this.testDevice = new TelldusDevice(testData);
        });

        describe('#getType()', function() {
            it('should return device', function() {
                expect(this.testDevice.getType()).to.equal('device');
            });
        });

        describe('#getId()', function() {
            it('should return id', function() {
                expect(this.testDevice.getId()).to.equal(63);
            });
        });

        describe('#getName()', function() {
            it('should return name', function() {
                expect(this.testDevice.getName()).to.equal('Device Name');
            });
        });

        describe('#getModel()', function() {
            it('should return model', function() {
                expect(this.testDevice.getModel()).to.equal('n/a');
            });
        });

        describe('#getApiProperty()', function() {
            it('should return id', function() {
                expect(this.testDevice.getApiProperty('id')).to.equal(63);
            });
            it('should return methods', function() {
                expect(this.testDevice.getApiProperty('methods')).to.equal(35);
            });
            it('should return model', function() {
                expect(this.testDevice.getApiProperty('model')).to.equal('n/a');
            });
            it('should return name', function() {
                expect(this.testDevice.getApiProperty('name')).to.equal('Device Name');
            });
            it('should return protocol', function() {
                expect(this.testDevice.getApiProperty('protocol')).to.equal('433');
            });
            it('should return state', function() {
                expect(this.testDevice.getApiProperty('state')).to.equal(2);
            });
            it('should return statevalue', function() {
                expect(this.testDevice.getApiProperty('statevalue')).to.equal('');
            });
            it('should return transport', function() {
                expect(this.testDevice.getApiProperty('transport')).to.equal('433');
            });
            it('should return type', function() {
                expect(this.testDevice.getApiProperty('type')).to.equal('device');
            });
            it('should return undefined for non-existing properties', function() {
                expect(this.testDevice.getApiProperty('not here')).to.equal(undefined);
            });
        });
    });
});
