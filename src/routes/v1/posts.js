//@flow

import { CONTENT_IS_NOT_HERE, SERVER_ERROR } from '../../static/serverMessage';
import { dbCollectionFind, dbCollectionInsertOne, dbCollectionUpdateOne, toDBId } from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';

async function getPostsHandler(req: Object, reply: Object): Object {
	try {
		const board: string = req.query.board;
		const queryObject: Object = board ? { 'board': { $eq: board } } : {};
		const result = await dbCollectionFind('posts', queryObject);
		reply.type('application/json').code(200);
		return HiddoutViewer.response({ 'posts': result });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { 'msg': err };
	}
}

async function getPostHandler(req: Object, reply: Object): Object {
	try {
		const queryObject: Object = { _id: toDBId(HiddoutViewer.getId(req.params.postId)) };
		const result = await dbCollectionFind('posts', queryObject);

		if (!result.length) {
			reply.type('application/json').code(404);
			return HiddoutViewer.response({ 'post': null, 'msg': CONTENT_IS_NOT_HERE });
		}

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ 'post': result[0] });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(404);
		return { 'msg': err };
	}
}

async function reactPostHandler(req: Object, reply: Object): Object {
	try{

		const update = await dbCollectionUpdateOne(
			'reactions',
			{ postId: toDBId(HiddoutViewer.getId(req.params.postId)) },
			{
				$push: {
					reactions: {
						userId: req.body.userId,
						reaction: req.body.reaction,
					},
				},
			},
			{ upsert: true },
		);
		reply.type('application/json').code(200);
		return HiddoutViewer.response({ reacted: update.result.ok });
	}catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

async function addPostHandler(req: Object, reply: Object): Object {
	try {

		const timeNow = new Date().getTime();

		const result = await dbCollectionInsertOne('posts', {
			title: req.body.title,
			content: req.body.content,
			board: req.body.board,
			userId: req.body.userId,
			score: 0,
			up: 0,
			down: 0,
			lol: 0,
			createTime: timeNow,
			lastUpdateTime: timeNow,
		});

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ 'insertedId': result.insertedId });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

function posts(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'GET',
		url: '/post/:postId',
		schema: {
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						post: {type: 'object',
							properties: {
									_id: { type: 'string' },
									title: { type: 'string' },
									content: { type: 'string' },
									board: { type: 'string' },
									userId: { type: 'string' },
									createTime: { type: 'string' },
									lastUpdateTime: { type: 'string' },
									score:{type: 'number'},
									up: {type: 'number'},
									down: {type: 'number'},
							},
						},
					},
				},
			},
		},
		handler: getPostHandler,
	});

	fastify.route({
		method: 'GET',
		url: '/posts',
		schema: {
			querystring: {
				board: { type: 'string' },
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						posts: {type: 'array',
							items: {
								type: 'object',
								properties: {
									_id: { type: 'string' },
									title: { type: 'string' },
									content: { type: 'string' },
									board: { type: 'string' },
									userId: { type: 'string' },
									createTime: { type: 'string' },
									lastUpdateTime: { type: 'string' },
									score:{type: 'number'},
									up: {type: 'number'},
									down: {type: 'number'},
								},
							},
						},
					},
				},
			},
		},
		handler: getPostsHandler,
	});

	fastify.route({
		method: 'POST',
		url: '/post/:postId/react',
		schema: {
			body: {
				type: 'object',
				properties: {
					userId: { type: 'string'},
					reaction: { type: 'string'},
				},
				required: ['reaction'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						reacted: {type: 'boolean'},
					},
				},
			},
		},
		onRequest: (request, reply, next) => {
			fastify.auth([fastify.verifyJWT])(request, reply, next);
		},
		handler: reactPostHandler,
	});

	fastify.route({
		method: 'POST',
		url: '/posts',
		schema: {
			body: {
				type: 'object',
				properties: {
					title: { type: 'string' },
					content: { type: 'string' },
					board: { type: 'string' },
					userId: { type: 'string' },
				},
				required: ['title', 'content', 'board','userId'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						insertedId: {type: 'string'},
					},
				},
			},
		},
		onRequest: (request, reply, next) => {
			fastify.auth([fastify.verifyJWT])(request, reply, next);
		},
		handler: addPostHandler,
	});

	next();
}

export { posts };
