//@flow

import { HiddoutCore } from './src/hiddout-core';
import { port } from './src/config/config.js';

const server = new HiddoutCore({ port: port });

server.start();
