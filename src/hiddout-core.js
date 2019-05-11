//@flow
import * as path from 'path';
import * as fs from 'fs';

import fastify from 'fastify';
import fastifyCORS from 'fastify-cors';
import fastifyJWT from 'fastify-jwt';
import fastifyRateLimit from 'fastify-rate-limit';
import fastifySwagger from 'fastify-swagger';
import fastifyStatic from 'fastify-static';

import { boards, comments, posts, signup, reactions, users } from './routes/v1';

import { CORSOrigin, port, secret, swaggerOptions } from './config';

class HiddoutCore {
	_isStart: boolean;
	_port: number;
	_fastify: fastify;

	constructor() {
		this._isStart = false;
		this._port = port;
	}

	start(): void {
		this._isStart = true;

		this._fastify = fastify({ maxParamLength: 180 });

		this._fastify.register(fastifyCORS, { origin: CORSOrigin });

		this._fastify
			.register(fastifyJWT, {
				secret: secret,
				sign: {
					expiresIn: '1h',
				},
			});

		this._fastify
			.decorate('verifyJWT', (request, reply, done) => {
				if (!request.req.headers['authorization']) {
					reply.code(401);
					done(new Error('Missing token header'));
				}

				request.jwtVerify(onVerify);

				function onVerify(err, decoded) {
					if (err || !decoded.userId || !decoded.ip || !decoded.agent) {
						reply.code(401);
						done(new Error('Token not valid'));
					}

					try {
						if (decoded.ip !== request.ip && decoded.agent !== request.headers['user-agent']) {
							reply.code(401);
							done(new Error('Token not valid'));
						}

						done();
					} catch (err) {
						reply.code(401);
						done(new Error('Token not valid'));
					}
				}
			});

		if (process.env.NODE_ENV === 'DEV') {
			this._fastify.register(fastifySwagger, swaggerOptions);
		}

		this._fastify.register(fastifyRateLimit, {
			max: 20,
			timeWindow: 5000,
		});

		this._fastify.register(fastifyStatic, {
			root: path.join(__dirname, '../public'),
			prefix: '/public/', // optional: default '/',
			setHeaders: (res, path, stat) => {
				if (/.js$/.test(path)) {
					res.setHeader('Service-Worker-Allowed', '/');
				}
			},
		});

		this._fastify.get('*', async (request, reply) => {
			let dir = fs.readdirSync(path.join(__dirname, '../public'));
			const htmlFiles = dir.filter((elm) => elm.match(/.html/));
			reply.sendFile(htmlFiles[0]);
		});

		this._fastify
			.register(boards, { prefix: '/api/v1' })
			.register(comments, { prefix: '/api/v1' })
			.register(posts, { prefix: '/api/v1' })
			.register(reactions, { prefix: '/api/v1' })
			.register(users, { prefix: '/api/v1' })
			.register(signup, { prefix: '/api/v1' });

		this._fastify.listen(this._port, (err, address) => {
			if (err) {
				throw err;
			}

			if (process.env.NODE_ENV === 'DEV') {
				this._fastify.swagger();
			}

			console.log(`server listening on ${address}`);
		});
	}
}

export { HiddoutCore };
