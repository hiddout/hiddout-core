const HiddoutCore = require('./bin/hiddout-core').HiddoutCore;
const server = new HiddoutCore({ port: 1234 });

server.start();