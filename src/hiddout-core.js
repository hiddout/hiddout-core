//@flow
import * as path from 'path';
import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import fastifyStatic from 'fastify-static';

import posts from './routes/posts';
import swaggerOptions from './config/swagger';

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

		this._fastify.register(fastifySwagger, swaggerOptions);

		this._fastify.register(fastifyStatic, {
			root: path.join(__dirname, '../public'),
			prefix: '/public/', // optional: default '/'
		});

		this._fastify.get('/', async (request, reply) => {
			reply.sendFile('index.html'); // serving path.join(__dirname, 'public', 'index.html') directly
		});

		this._fastify.register(posts);

		this._fastify.listen(this._port, (err, address) => {
			if (err) {throw err;}
			this._fastify.swagger();
			console.log(`server listening on ${address}`);
		});
	}
}

export { HiddoutCore };
