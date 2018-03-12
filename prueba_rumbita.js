const NodeHelper = require('node_helper');
const Player = require('node-aplay');
const fs = require('fs');
const path = require('path');

const miio = require('miio');

miio.device({ address: '192.168.1.110', token: '637970436e395071646843614d57517a' })
    .then(device => function (device) {
        console.log('Connected to', device);
        console.log('type', device.type);

    })
    .catch(err => handleErrorHere);





