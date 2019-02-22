// @flow

import * as sjcl from 'sjcl';

import { SUCCESS } from '../../static/serverMessage';
import { dbCollectionInsertOne } from '../../db/client';

async function signUpHandler(req: Object, reply: Object): Object {
	try {
		const timeNow = new Date().getTime();

		const saltBits = sjcl.random.randomWords(16);

		const derivedKey = sjcl.misc.pbkdf2(req.body.pwh, saltBits, 1000, 256);

		const userKey = sjcl.codec.hex.fromBits(derivedKey);
		const salt = sjcl.codec.hex.fromBits(saltBits);

		// const re = sjcl.codec.hex.toBits(salt);

		await dbCollectionInsertOne('users', {
			name: req.body.name,
			userKey: userKey,
			slat: salt,
			joinTime: timeNow,
		});

		reply.type('application/json').code(200);
		return { 'msg': SUCCESS };

	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { 'msg': err.errmsg };
	}
}

function signup(fastify: fastify, opts: Object, next: ()=> any):void {
	fastify.route({
		method: 'POST',
		url: '/signup',
		schema: {
			response: {
				'200': {
					type: 'object',
					properties: {
						msg: { type: 'string' },
					},
				},
			},
		},
		handler: signUpHandler,
	});

	next();
}

export {signup};