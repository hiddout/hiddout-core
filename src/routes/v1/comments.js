//@flow

import {
	dbCollectionFind,
	dbCollectionUpdateOne,
	dbCollectionInsertOne,
	toDBId,
} from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';

const COMMENT_NUMBER_EACH_PULL = 100;

async function getCommentsHandler(req: Object, reply: Object): Object {
	try {
		const realId = HiddoutViewer.getId(req.params.postId);
		if (!realId) {
			reply.type('application/json').code(200);
			return HiddoutViewer.response({ comments: {} });
		}

		const page: number = parseInt(req.query.page);
		let limit = COMMENT_NUMBER_EACH_PULL;
		if (!page) {
			limit += 1;
		}

		const queryObject: Object = {
			postId: { $eq: toDBId(realId) },
		};
		const result = await dbCollectionFind('comments', queryObject, {
			limit: limit,
			skip: page * COMMENT_NUMBER_EACH_PULL,
		});
		let isLatest = result.length < limit;

		reply.type('application/json').code(200);
		const comments = !page
			? result.slice(0, COMMENT_NUMBER_EACH_PULL)
			: result;
		return HiddoutViewer.response({
			comments: comments,
			isLatest: isLatest,
		});
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err.name };
	}
}

async function addCommentHandler(req: Object, reply: Object): Object {
	try {
		const realId = HiddoutViewer.getId(req.params.postId);

		if (!realId) {
			reply.type('application/json').code(200);
			return HiddoutViewer.response({ replied: false });
		}

		const timeNow = new Date().getTime();

		const dbId = toDBId(realId);

		const queryObject: Object = { postId: dbId };
		const result = await dbCollectionFind('comments', queryObject);


		const update = await dbCollectionUpdateOne('posts',
			{_id: dbId},
			{$set: {lastUpdateTime: timeNow,reply: result.length + 1 }},
		);

		const added = await dbCollectionInsertOne('comments', {
			postId: dbId,
			replyTo: req.body.replyTo,
			content: req.body.content,
			userId: req.user.userId,
			score: 0,
			up: 0,
			down: 0,
			lol: 0,
			createTime: timeNow,
			lastUpdateTime: timeNow,
		});

		reply.type('application/json').code(200);
		return HiddoutViewer.response({
			replied: added.result.ok && update.result.ok,
		});
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err };
	}
}

function comments(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'GET',
		url: '/post/:postId/comments',
		schema: {
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						comments: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									postId: { type: 'string' },
									replyTo: { type: 'number' },
									content: { type: 'string' },
									userId: { type: 'string' },
									score: { type: 'number' },
									up: { type: 'number' },
									down: { type: 'number' },
									lol: { type: 'number' },
									createTime: { type: 'number' },
									lastUpdateTime: { type: 'number' },
								},
							},
						},
						isLatest: { type: 'boolean' },
					},
				},
			},
		},
		handler: getCommentsHandler,
	});

	fastify.route({
		method: 'POST',
		url: '/post/:postId/comments',
		schema: {
			body: {
				type: 'object',
				properties: {
					content: { type: 'string' },
					replyTo: { type: 'number' },
				},
				required: ['content', 'replyTo'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						replied: { type: 'boolean' },
					},
				},
			},
		},
		onRequest: (request, reply, done) => {
			fastify.verifyJWT(request, reply, done);
		},
		handler: addCommentHandler,
	});

	next();
}

export { comments };
