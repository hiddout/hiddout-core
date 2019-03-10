// @flow

import * as sjcl from 'sjcl';

import { SERVER_ERROR, SUCCESS, USERNAME_OR_PASSWORD_IS_WRONG } from '../../static/serverMessage';
import { dbCollectionFind, dbCollectionInsertOne } from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';

async function userLoginHandler(req: Object, reply: Object): Object {
	try{
		const userInfo = await dbCollectionFind('users', {
			user: { $eq: req.body.user },
		});

		if (!userInfo.length) {
			reply.type('application/json').code(200);
			return { status:1 ,token: null, msg: USERNAME_OR_PASSWORD_IS_WRONG };
		}

		const saltBits = sjcl.codec.hex.toBits(userInfo[0].salt);
		const derivedKey = sjcl.misc.pbkdf2(req.body.pwh, saltBits, 1000, 256);
		const userKey = sjcl.codec.hex.fromBits(derivedKey);

		reply.type('application/json').code(200);

		if(userKey === userInfo[0].userKey){
			const token = await this.jwt.sign(req.body);
			return HiddoutViewer.response({ status:0, token: token, msg: SUCCESS });
		}else {
			return HiddoutViewer.response({ status:1 ,token: null, msg: USERNAME_OR_PASSWORD_IS_WRONG });
		}
	}catch (err) {
		console.error(err);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

async function userNameCheckHandler(req: Object, reply: Object): Object {
	try {
		const userInfo = await dbCollectionFind('users', {
			user: { $eq: req.query.user },
		});

		let isUsed = false;

		if (userInfo.length) {
			isUsed = true;
		}

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ isUsed: isUsed, msg: SUCCESS });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err };
	}
}

async function signUpHandler(req: Object, reply: Object): Object {
	try {
		const timeNow = new Date().getTime();

		const userInfo = await dbCollectionFind('users', {
			user: { $eq: req.body.user },
		});

		if (userInfo.length) {
			reply.type('application/json').code(200);
			return HiddoutViewer.response({ isUsed: true, token:null, msg: SUCCESS });
		}

		const saltBits = sjcl.random.randomWords(16);

		const derivedKey = sjcl.misc.pbkdf2(req.body.pwh, saltBits, 1000, 256);

		const userKey = sjcl.codec.hex.fromBits(derivedKey);
		const salt = sjcl.codec.hex.fromBits(saltBits);

		await dbCollectionInsertOne('users', {
			user: req.body.user,
			userKey: userKey,
			salt: salt,
			joinTime: timeNow,
		});

		const token = await this.jwt.sign(req.body);

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ isUsed: false, token: token, msg: SUCCESS });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err.errmsg };
	}
}

function signup(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'GET',
		url: '/checkUser',
		schema: {
			querystring: {
				user: { type: 'string' },
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						isUsed: { type: 'string' },
					},
				},
			},
		},
		handler: userNameCheckHandler.bind(fastify),
	});

	fastify.route({
		method: 'POST',
		url: '/signup',
		schema: {
			body: {
				type: 'object',
				properties: {
					user: { type: 'string' },
					pwh: { type: 'string' },
				},
				required: ['user', 'pwh'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
					},
				},
			},
		},
		handler: signUpHandler.bind(fastify),
	});

	fastify.route({
		method: 'POST',
		url: '/login',
		schema: {
			body: {
				type: 'object',
				properties: {
					user: { type: 'string' },
					pwh: { type: 'string' },
				},
				required: ['user', 'pwh'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
					},
				},
			},
		},
		handler: userLoginHandler.bind(fastify),
	});

	next();
}

export { signup };
