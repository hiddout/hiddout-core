// @flow

import {HiddoutCore} from "./src/hiddout-core";

const server = new HiddoutCore({port: 1234});
server.start();