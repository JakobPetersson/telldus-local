const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should;
const TelldusSensor = require('../src/TelldusSensor.js');

describe('TelldusSensor', function() {
    describe('When constructor called without data', function() {
        it('should throw an error', function() {
            expect(function() {
                new TelldusSensor();
            }).to.throw();
        });
    });

    describe('When created with valid data', function() {
        before(function() {
            const testData = {
                data: [{
                        name: 'temp',
                        scale: 0,
                        value: 26.3
                    },
                    {
                        name: 'humidity',
                        scale: 0,
                        value: 63
                    }
                ],
                id: 72,
                model: 'temperaturehumidity',
                name: 'Sensor Name',
                protocol: 'fineoffset',
                sensorId: 72
            };
            this.testSensor = new TelldusSensor(testData);
        });

        describe('#getType()', function() {
            it('should return sensor', function() {
                expect(this.testSensor.getType()).to.equal('sensor');
            });
        });

        describe('#getId()', function() {
            it('should return id', function() {
                expect(this.testSensor.getId()).to.equal(72);
            });
        });

        describe('#getName()', function() {
            it('should return name', function() {
                expect(this.testSensor.getName()).to.equal('Sensor Name');
            });
        });

        describe('#getModel()', function() {
            it('should return model', function() {
                expect(this.testSensor.getModel()).to.equal('temperaturehumidity');
            });
        });

        describe('#getAllData()', function() {
            it('should return all data', function() {
                expect(this.testSensor.getAllData()).to.deep.equal([{
                        name: 'temp',
                        scale: 0,
                        value: 26.3
                    },
                    {
                        name: 'humidity',
                        scale: 0,
                        value: 63
                    }
                ]);
            });
        });

        describe('#getData()', function() {
            it('should return temp', function() {
                expect(this.testSensor.getData('temp')).to.deep.equal({
                        name: 'temp',
                        scale: 0,
                        value: 26.3
                    });
            });
            it('should return humidity', function() {
                expect(this.testSensor.getData('humidity')).to.deep.equal({
                    name: 'humidity',
                    scale: 0,
                    value: 63
                });
            });
            it('should return undefined for non-existing data', function() {
                expect(this.testSensor.getData('not here')).to.equal(undefined);
            });
        });

        describe('#getApiProperty()', function() {
            it('should return id', function() {
                expect(this.testSensor.getApiProperty('id')).to.equal(72);
            });
            it('should return model', function() {
                expect(this.testSensor.getApiProperty('model')).to.equal('temperaturehumidity');
            });
            it('should return name', function() {
                expect(this.testSensor.getApiProperty('name')).to.equal('Sensor Name');
            });
            it('should return protocol', function() {
                expect(this.testSensor.getApiProperty('protocol')).to.equal('fineoffset');
            });
            it('should return sensorId', function() {
                expect(this.testSensor.getApiProperty('sensorId')).to.equal(72);
            });
            it('should return undefined for non-existing properties', function() {
                expect(this.testSensor.getApiProperty('not here')).to.equal(undefined);
            });
        });
    });
});
