'use strict';

const Constants = {
    COMMANDS: {
        on: 0x0001, // 1
        off: 0x0002, // 2
        bell: 0x0004, // 4
        toggle: 0x0008, // 8
        dim: 0x0010, // 16
        learn: 0x0020, // 32
        execute: 0x0040, // 64
        up: 0x0080, // 128
        down: 0x0100, // 256
        stop: 0x0200 // 512
    },
    METHODS: {
        0x0001: 'on',
        0x0002: 'off',
        0x0004: 'bell',
        0x0008: 'toggle',
        0x0010: 'dim',
        0x0020: 'learn',
        0x0040: 'execute',
        0x0080: 'up',
        0x0100: 'down',
        0x0200: 'stop'
    },
    EXTRAS: 'coordinate,timezone,transport,tzoffset'
};
Constants.SUPPORTED_METHODS = Object.keys(Constants.COMMANDS)
    .reduce(function(previous, key) {
        return previous + Constants.COMMANDS[key];
    }, 0);

module.exports = Constants;
