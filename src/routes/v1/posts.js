//@flow

import { CONTENT_IS_NOT_HERE, SERVER_ERROR } from '../../static/serverMessage';
import {
	dbCollectionFind,
	dbCollectionInsertOne,
	toDBId,
} from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';

const POST_NUMBER_EACH_PAGE = 15;

async function getPostsHandler(req: Object, reply: Object): Object {
	try {
		const board: string = req.query.board;
		const queryObject: Object = board ? { board: { $eq: board } } : {board: { $ne: 'spam' }};
		const page: number = req.query.page;
		const result = await dbCollectionFind('posts', queryObject, { limit: POST_NUMBER_EACH_PAGE, skip: page * POST_NUMBER_EACH_PAGE });
		reply.type('application/json').code(200);
		return HiddoutViewer.response({ posts: result, isLatest: result.length < POST_NUMBER_EACH_PAGE });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err };
	}
}

async function getPostHandler(req: Object, reply: Object): Object {
	try {
		const realId = HiddoutViewer.getId(req.params.postId);

		if (!realId) {
			reply.type('application/json').code(404);
			return HiddoutViewer.response({
				post: null,
				msg: CONTENT_IS_NOT_HERE,
			});
		}

		const queryObject: Object = { _id: toDBId(realId) };
		const result = await dbCollectionFind('posts', queryObject);

		if (!result.length) {
			reply.type('application/json').code(404);
			return HiddoutViewer.response({
				post: null,
				msg: CONTENT_IS_NOT_HERE,
			});
		}

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ post: result[0] });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err };
	}
}

async function addPostHandler(req: Object, reply: Object): Object {
	try {

		const timeNow = new Date().getTime();

		const result = await dbCollectionInsertOne('posts', {
			title: req.body.title,
			content: req.body.content,
			board: req.body.board,
			userId: req.user.userId,
			score: 0,
			up: 0,
			down: 0,
			lol: 0,
			isLock: false,
			lockedFor:'',
			createTime: timeNow,
			lastUpdateTime: timeNow,
		});

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ insertedId: result.insertedId });
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
						post: {
							type: 'object',
							properties: {
								_id: { type: 'string' },
								title: { type: 'string' },
								content: { type: 'string' },
								board: { type: 'string' },
								userId: { type: 'string' },
								createTime: { type: 'string' },
								lastUpdateTime: { type: 'string' },
								score: { type: 'number' },
								up: { type: 'number' },
								down: { type: 'number' },
								isLock: {type: 'boolean'},
								lockedFor: { type: 'string' },
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
						posts: {
							type: 'array',
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
									score: { type: 'number' },
									up: { type: 'number' },
									down: { type: 'number' },
									isLock: {type: 'boolean'},
									lockedFor: { type: 'string' },
								},
							},
						},
						isLatest: {type:'boolean'},
					},
				},
			},
		},
		handler: getPostsHandler,
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
					language: { type: 'string' },
				},
				required: ['title', 'content', 'board', 'language'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						insertedId: { type: 'string' },
					},
				},
			},
		},
		onRequest:(request, reply, done) => {
			fastify.verifyJWT(request, reply, done);
		},
		handler: addPostHandler,
	});

	next();
}

export { posts };
