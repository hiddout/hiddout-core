"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HiddoutCore = void 0;

var _fastify = _interopRequireDefault(require("fastify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class HiddoutCore {
  constructor(props) {
    _defineProperty(this, "_isStart", void 0);

    _defineProperty(this, "_port", void 0);

    this._isStart = false;
    this._port = props.port || 3000;
  }

  start() {
    this._isStart = true;
    const fy = (0, _fastify.default)();
    fy.get('/', async (request, reply) => {
      reply.type('application/json').code(200);
      return {
        hello: 'world'
      };
    });
    fy.listen(this._port, (err, address) => {
      if (err) {
        throw err;
      }

      console.log(`server listening on ${address}`);
    });
  }

}

exports.HiddoutCore = HiddoutCore;