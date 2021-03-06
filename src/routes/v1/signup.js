// @flow

import * as sjcl from 'sjcl';

import {
	CONTENT_IS_NOT_HERE,
	SERVER_ERROR,
	SUCCESS,
	USERNAME_OR_PASSWORD_IS_WRONG,
} from '../../static/serverMessage';
import {
	isAdminUser,
	dbCollectionFind,
	dbCollectionInsertOne,
	dbCollectionUpdateOne, dbDeleteOne, dbDeleteMany, dbUpdateMany,
} from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';

async function renewTokenHandler(req: Object, reply: Object): Object {
	try {
		let tokenKeyDecoded = null;

		try {
			tokenKeyDecoded = await this.jwt.verify(req.body.tokenKey);
		} catch (err) {
			console.error(err);
			reply.type('application/json').code(401);
			return { msg: 'TokenKey out of date' };
		}

		const userInfos = await dbCollectionFind('users', {
			user: { $eq: tokenKeyDecoded.userId },
		});

		const userInfo = userInfos[0];

		if(userInfo.tokenKey !== req.body.tokenKey){
			reply.type('application/json').code(401);
			return { msg: 'TokenKey not match' };
		}

		const ipSections = tokenKeyDecoded.ip.split('.'),
			requestIpSections = req.ip.split('.');

		if (
			ipSections[0] !== requestIpSections[0] ||
			ipSections[1] !== requestIpSections[1] ||
			tokenKeyDecoded.agent !== req.headers['user-agent']
		) {
			reply.code(401);
			return { msg: 'Token not valid' };
		}

		let accessData = {
			userId: tokenKeyDecoded.userId,
			ip: tokenKeyDecoded.ip,
			agent: tokenKeyDecoded.agent,
		};

		if (tokenKeyDecoded.isAdmin) {
			if (await isAdminUser(tokenKeyDecoded.userId)) {
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

async function deleteAccountHandler(req: Object, reply: Object): Object {
	try {
		const userInfos = await dbCollectionFind('users', {
			user: { $eq: req.body.user },
		});

		if (!userInfos.length) {
			reply.type('application/json').code(400);
			return {
				isDone: false,
				msg: USERNAME_OR_PASSWORD_IS_WRONG,
			};
		}

		const userInfo = userInfos[0];

		const saltBits = sjcl.codec.hex.toBits(userInfo.salt);
		const derivedKey = sjcl.misc.pbkdf2(req.body.pwh, saltBits, 1000, 256);
		const userKey = sjcl.codec.hex.fromBits(derivedKey);

		reply.type('application/json').code(200);

		if (userKey === userInfo.userKey) {

			await dbDeleteOne(
				'users',
				{ user: req.body.user },
			);

			await dbDeleteMany(
				'posts',
				{ userId: req.body.user },
			);

			await dbDeleteMany(
				'subscriptions',
				{ userId: req.body.user },
			);

			await dbUpdateMany(
				'comments',
				{ userId: req.body.user },
				{ $set: {
						replyTo: 0,
						content: 'N/A',
						userId: 'N/A',
						score: 0,
						up: 0,
						down: 0,
						lol: 0,
					},
				}
			);

			reply.type('application/json').code(200);

			return HiddoutViewer.response({
				isDone: true,
			});
		} else {
			reply.type('application/json').code(400);
			return {
				isDone: false,
				msg: USERNAME_OR_PASSWORD_IS_WRONG,
			};
		}

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

			const tokenKeySignOptions = {
				...this.jwt.options.sign,
				expiresIn: isAdmin ? '1d' : '14d',
			};

			userInfo.tokenKey = await this.jwt.sign(
				accessData,
				tokenKeySignOptions,
			);

			await dbCollectionUpdateOne(
				'users',
				{ user: userInfo.user },
				{
					$set: userInfo,
				},
			);

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

async function changePassWordHandler(req: Object, reply: Object): Object {
	try {
		const userInfos = await dbCollectionFind('users', {
			user: { $eq: req.user.userId },
		});

		if (!userInfos.length) {
			reply.type('application/json').code(401);
			return {
				msg: CONTENT_IS_NOT_HERE,
			};
		}

		const userInfo = userInfos[0];

		const saltBits = sjcl.codec.hex.toBits(userInfo.salt);
		const derivedKey = sjcl.misc.pbkdf2(req.body.old, saltBits, 1000, 256);
		const userKey = sjcl.codec.hex.fromBits(derivedKey);

		reply.type('application/json').code(200);

		if (userKey === userInfo.userKey) {
			let accessData = {
				userId: req.user.userId,
				ip: req.ip,
				agent: req.headers['user-agent'],
			};

			const isAdmin = await isAdminUser(accessData.userId);

			if (isAdmin) {
				accessData = { ...accessData, isAdmin };
			}

			const newSaltBits = sjcl.random.randomWords(16);

			const newDerivedKey = sjcl.misc.pbkdf2(req.body.new, newSaltBits, 1000, 256);

			userInfo.userKey = sjcl.codec.hex.fromBits(newDerivedKey);
			userInfo.salt = sjcl.codec.hex.fromBits(newSaltBits);

			const tokenKeySignOptions = {
				...this.jwt.options.sign,
				expiresIn: isAdmin ? '1d' : '14d',
			};

			userInfo.tokenKey = await this.jwt.sign(
				accessData,
				tokenKeySignOptions,
			);

			const update = await dbCollectionUpdateOne(
				'users',
				{ user: userInfo.user },
				{
					$set: userInfo,
				},
			);

			const token = await this.jwt.sign(accessData);

			const tokenKey = userInfo.tokenKey;

			return HiddoutViewer.response({ changed: update.result.ok, token, tokenKey, isAdmin });
		} else {
			reply.type('application/json').code(200);

			return HiddoutViewer.response({
				changed: false,
			});
		}
	}catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err.errmsg };
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

		const tokenKeySignOptions = {
			...this.jwt.options.sign,
			expiresIn: '1d',
		};

		const accessData = {
			userId: req.body.user,
			ip: req.ip,
			agent: req.headers['user-agent'],
		};

		const tokenKey = await this.jwt.sign(
			accessData,
			tokenKeySignOptions,
		);

		await dbCollectionInsertOne('users', {
			user: req.body.user,
			userKey: userKey,
			avatar: 0,
			tokenKey: tokenKey,
			salt: salt,
			joinTime: timeNow,
		});

		const token = await this.jwt.sign(accessData);

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
					tokenKey: { type: 'string' },
				},
				required: ['tokenKey'],
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
		url: '/changePassWord',
		schema: {
			body: {
				type: 'object',
				properties: {
					old: { type: 'string' },
					new: { type: 'string' },
				},
				required: ['old','new'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						changed: { type: 'boolean' },
						token: { type: 'string' },
						tokenKey: { type: 'string' },
						isAdmin: { type: 'boolean' },
					},
				},
			},
		},
		onRequest:(request, reply, done) => {
			fastify.verifyJWT(request, reply, done);
		},
		handler: changePassWordHandler,
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
		url:'/account/delete',
		schema: {
			body: {
				type: 'object',
				properties: {
					user: { type: 'string' },
					pwh: {type: 'string' },
				},
				required: ['user', 'pwh'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						isDone: { type: 'boolean' },
					},
				},
			},
		},
		handler: deleteAccountHandler,
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
