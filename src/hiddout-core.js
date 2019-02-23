//@flow
import * as path from 'path';

import * as sjcl from 'sjcl';

import fastify from 'fastify';
import fastifyJWT from 'fastify-jwt';
import fastifyAuth from 'fastify-auth';
import fastifySwagger from 'fastify-swagger';
import fastifyStatic from 'fastify-static';

import { boards, comments, posts, signup } from './routes/v1';

import { swaggerOptions } from './config';
import { dbCollectionFind } from './db/client';

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

		this._fastify
			.register(fastifyJWT, {
				secret: 'supersecret',
				sign: {
					expiresIn: '1h',
				},
			})
			.register(fastifyAuth);

		this._fastify
			.decorate('verifyJWT',async (request, reply, done) => {
				if (!request.req.headers['authorization']) {
					return done(new Error('Missing token header'));
				}

				await request.jwtVerify(onVerify);

				async function onVerify(err, decoded) {
					if (err || !decoded.user || !decoded.pwh) {
						return done(new Error('Token not valid'));
					}

					try {
						const userInfo = await dbCollectionFind('users', {
							user: { $eq: decoded.user },
						});

						if (!userInfo.length) {
							return done(new Error('Token not valid'));
						}

						const saltBits = sjcl.codec.hex.toBits(
							userInfo[0].salt,
						);
						const derivedKey = sjcl.misc.pbkdf2(
							decoded.pwh,
							saltBits,
							1000,
							256,
						);
						const userKey = sjcl.codec.hex.fromBits(derivedKey);

						if (userKey !== userInfo[0].userKey) {
							return done(new Error('Token not valid'));
						}

						done();
					} catch (err) {
						console.log(err.stack);
						return done(new Error('Token not valid'));
					}
				}
			})
			.decorate('verifyPWH', async (request, reply, done) => {

				try {
					const userInfo = await dbCollectionFind('users', {
						user: { $eq: request.body.user },
					});

					if (!userInfo.length) {
						return done(new Error('1 User/Password not valid'));
					}

					const saltBits = sjcl.codec.hex.toBits(userInfo[0].salt);
					const derivedKey = sjcl.misc.pbkdf2(
						request.body.pwh,
						saltBits,
						1000,
						256,
					);
					const userKey = sjcl.codec.hex.fromBits(derivedKey);

					if (userKey !== userInfo[0].userKey) {
						return done(new Error('2 User/Password not valid'));
					}

					done();
				} catch (err) {
					return done(err);
				}
			});

		this._fastify.register(fastifySwagger, swaggerOptions);

		this._fastify.register(fastifyStatic, {
			root: path.join(__dirname, '../public'),
			prefix: '/public/', // optional: default '/'
		});

		this._fastify.get('/', async (request, reply) => {
			reply.sendFile('index.html'); // serving path.join(__dirname, 'public', 'index.html') directly
		});

		this._fastify
			.register(boards, { prefix: '/api/v1' })
			.register(comments, { prefix: '/api/v1' })
			.register(posts, { prefix: '/api/v1' })
			.register(signup, { prefix: '/api/v1' });

		this._fastify.listen(this._port, (err, address) => {
			if (err) {
				throw err;
			}
			this._fastify.swagger();
			console.log(`server listening on ${address}`);
		});
	}
}

export { HiddoutCore };
