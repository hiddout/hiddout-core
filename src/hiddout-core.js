//@flow
import fastify from 'fastify';

type HiddoutPropsType = {
	port?: number,
};

class HiddoutCore {
	_isStart: boolean;
	_port: number;

	constructor(props: HiddoutPropsType) {
		this._isStart = false;
		this._port = props.port || 3000;
	}

	start(): void {
		this._isStart = true;

		const fy = fastify();

		fy.get('/', async (request, reply) => {
			reply.type('application/json').code(200);
			return { hello: 'world' };
		});

		fy.listen(this._port, (err, address) => {
			if (err) {throw err;}
			console.log(`server listening on ${address}`);
		});
	}
}

export { HiddoutCore };
