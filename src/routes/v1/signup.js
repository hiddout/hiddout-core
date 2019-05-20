// @flow

import * as sjcl from 'sjcl';

import {
	SERVER_ERROR,
	SUCCESS,
	USERNAME_OR_PASSWORD_IS_WRONG,
} from '../../static/serverMessage';
import {
	isAdminUser,
	dbCollectionFind,
	dbCollectionInsertOne,
	dbCollectionUpdateOne,
} from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';

async function renewTokenHandler(req: Object, reply: Object): Object {
	try {
		const tokenDecoded = await this.jwt.decode(req.body.token);

		if (!tokenDecoded.userId || !tokenDecoded.ip || !tokenDecoded.agent) {
			reply.code(401);
			return { msg: 'Token not valid' };
		}

		let tokenKeyDecoded = null;

		try {
			tokenKeyDecoded = await this.jwt.verify(req.body.tokenKey);
		} catch (err) {
			console.error(err);
			reply.type('application/json').code(401);
			return { msg: 'TokenKey out of date' };
		}

		if (
			tokenDecoded.userId !== tokenKeyDecoded.userId ||
			tokenDecoded.ip !== req.ip ||
			tokenDecoded.agent !== req.headers['user-agent']
		) {
			reply.code(401);
			return { msg: 'Token not valid' };
		}

		let accessData = {
			userId: tokenDecoded.isAdmin,
			ip: req.ip,
			agent: req.headers['user-agent'],
		};

		if (tokenDecoded.isAdmin) {
			if (await isAdminUser(tokenDecoded.userId)) {
				accessData = { ...accessData, isAdmin: true };
			}
		}

		const token = await this.jwt.sign(accessData);

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ token: token });
	} catch (err) {
		console.error(err);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

async function userLoginHandler(req: Object, reply: Object): Object {
	try {
		const userInfos = await dbCollectionFind('users', {
			user: { $eq: req.body.user },
		});

		if (!userInfos.length) {
			reply.type('application/json').code(401);
			return {
				token: null,
				msg: USERNAME_OR_PASSWORD_IS_WRONG,
			};
		}

		const userInfo = userInfos[0];

		const saltBits = sjcl.codec.hex.toBits(userInfo.salt);
		const derivedKey = sjcl.misc.pbkdf2(req.body.pwh, saltBits, 1000, 256);
		const userKey = sjcl.codec.hex.fromBits(derivedKey);

		reply.type('application/json').code(200);

		if (userKey === userInfo.userKey) {
			let accessData = {
				userId: req.body.user,
				ip: req.ip,
				agent: req.headers['user-agent'],
			};

			const isAdmin = await isAdminUser(accessData.userId);

			if (isAdmin) {
				accessData = { ...accessData, isAdmin };
			}

			try {
				await this.jwt.verify(userInfo.tokenKey);
			} catch (err) {
				userInfo.tokenKey = await this.jwt.sign(
					{
						userId: req.body.user,
					},
					{
						expiresIn: isAdmin ? '1d' : '14d',
					},
				);

				await dbCollectionUpdateOne(
					'users',
					{ user: userInfo.user },
					{
						$set: userInfo,
					},
				);
			}

			const token = await this.jwt.sign(accessData);

			const tokenKey = userInfo.tokenKey;

			return HiddoutViewer.response({ token, tokenKey, isAdmin });
		} else {
			reply.type('application/json').code(401);

			return {
				token: null,
				msg: USERNAME_OR_PASSWORD_IS_WRONG,
			};
		}
	} catch (err) {
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
		if (/[^a-zA-Z0-9_]/.test(req.body.user) || req.body.user.length > 36) {
			reply.type('application/json').code(401);
			return HiddoutViewer.response({
				token: null,
				msg: SUCCESS,
			});
		}

		const timeNow = new Date().getTime();

		const userInfo = await dbCollectionFind('users', {
			user: { $eq: req.body.user },
		});

		if (userInfo.length) {
			reply.type('application/json').code(401);
			return HiddoutViewer.response({
				token: null,
				msg: SUCCESS,
			});
		}

		const saltBits = sjcl.random.randomWords(16);

		const derivedKey = sjcl.misc.pbkdf2(req.body.pwh, saltBits, 1000, 256);

		const userKey = sjcl.codec.hex.fromBits(derivedKey);
		const salt = sjcl.codec.hex.fromBits(saltBits);

		const tokenKey = await this.jwt.sign(
			{
				userId: req.body.user,
			},
			{
				expiresIn: '1d',
			},
		);

		await dbCollectionInsertOne('users', {
			user: req.body.user,
			userKey: userKey,
			tokenKey: tokenKey,
			salt: salt,
			joinTime: timeNow,
		});

		const token = await this.jwt.sign({
			userId: req.body.user,
			ip: req.ip,
			agent: req.headers['user-agent'],
		});

		reply.type('application/json').code(200);
		return HiddoutViewer.response({
			token: token,
			tokenKey: tokenKey,
			msg: SUCCESS,
		});
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err.errmsg };
	}
}

function signup(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'POST',
		url: '/renewToken',
		schema: {
			body: {
				type: 'object',
				properties: {
					token: { type: 'string' },
					tokenKey: { type: 'string' },
				},
				required: ['token', 'tokenKey'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						token: { type: 'string' },
					},
				},
			},
		},
		handler: renewTokenHandler,
	});

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
		handler: userNameCheckHandler,
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
						token: { type: 'string' },
						tokenKey: { type: 'string' },
					},
				},
			},
		},
		handler: signUpHandler,
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
						token: { type: 'string' },
						tokenKey: { type: 'string' },
						isAdmin: { type: 'boolean' },
					},
				},
			},
		},
		handler: userLoginHandler,
	});

	next();
}

export { signup };
