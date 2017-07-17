# telldus-local

A node.js module to interface with the Telldus Local API available in the Tellstick ZNet Lite. The API is accessible on `<IP_OF_DEVICE>/api`.

## Before Starting

You will need an access token. Read [Local API Documentation](http://api.telldus.net/localapi/api.html) for information on how to get an access token.

## Install

```
npm install telldus-local
```

## API

### Configure and instantiate

```
const TelldusLocal = require('telldus-local');

const config = {
    hostname: 'Hostname/IP of your device',
    accessToken: 'Your access token'
};

const telldusLocal = new TelldusLocal(config);

telldusLocal.getDevices().then((devices) => {
    console.log(devices);
}).catch(err => {
    console.log(err); //Error occured
});
```

### Get device & sensor information

```
telldusLocal.getAccessories().then((accessories) => {
    // Do something with devices and sensors
});
```

# Get device information

```
telldusLocal.getDevices().then((devices) => {
    // Do something with the devices
});

telldusLocal.getDevice(id).then((device) => {
    // Do something with device
});

/*
 * Alias of device.getInfo
 */
device.update().then(...);

/*
 * Update device info
 */
device.getInfo().then(device => {
    // Updated device info
});
```

## Modify device

```
/*
 * Change device name
 */
device.setName(name);
```

## Device actions

```
device.learn();

device.bell();

device.dim(level);

device.turnOn();

device.turnOff();

device.up();

device.down();

device.stop();

device.command(method, value);
```

## Get sensor information

```
telldusLocal.getSensors().then((sensors) => {
    // Do something with the sensors
});

telldusLocal.getSensor(id).then((sensor) => {
    // Do something with sensor
});

/*
 * Alias of sensor.getInfo
 */
sensor.update().then(...);

/*
 * Update sensor info
 */
sensor.getInfo().then(sensor => {
    // Updated sensor info
});

/*
 *  Get a named data from the sensor, e.g. 'temp'
 */
sensor.getDataByName(name);
```

## Modify sensor

```
/*
 * Change sensor name
 */
sensor.setName(name);
```

## Lua (Not implemented)
