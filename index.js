//@flow

import { HiddoutCore } from './src/hiddout-core';
import { port } from './src/devConfig/config.js';

const server = new HiddoutCore({ port: port });

server.start();
