//@flow
import fastify from 'fastify';

type HiddoutCorePropsType = {
	port?: number,
};

class HiddoutCore {
	_isStart: boolean;
	_port: number;
	_fastify: fastify;

	constructor(props: HiddoutCorePropsType) {
		this._isStart = false;
		this._port = props.port || 3000;
	}

	start(): void {
		this._isStart = true;

		this._fastify = fastify();

		this._fastify.get('/', async (request, reply) => {
			reply.type('application/json').code(200);
			return { hello: 'world' };
		});

		this._fastify.listen(this._port, (err, address) => {
			if (err) {throw err;}
			console.log(`server listening on ${address}`);
		});
	}
}

export { HiddoutCore };
