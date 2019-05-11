var protocol = require('./protocol');
var moment = require('moment');
const dgram = require('dgram');
var uuid = require('uuid');
var s = dgram.createSocket('udp4');

const instruments = {
    piano: "ti-ta-ti",
    trumpet: "pouet",
    flute: "trulu",
    violin: "gzi-gzi",
    drum: "boum-boum"
};
var instrument = process.argv[2];

if(instrument === undefined){
    console.log("Error : instrument undefined.\nplease choose between : \n -> piano\n -> trumpet\n -> flute\n -> violin\n -> drum");
    process.exit(1);
}

var jsonSent = {
    uuid: uuid(),
    instrument: instrument,
    activeSince: moment()
};

const payload = JSON.stringify(jsonSent);

setInterval(emitSound, 1000);

function emitSound() {
    message = new Buffer(payload);
    s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function (err, bytes) {
        console.log(instruments[jsonSent.instrument] + ' message : ' + message);
    });
}