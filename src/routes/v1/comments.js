//@flow

import {
	dbCollectionFindOne,
	dbCollectionUpdateOne,
	toDBId,
} from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';

async function getCommentsHandler(req: Object, reply: Object): Object {
	try {
		const realId = HiddoutViewer.getId(req.params.postId);
		if (!realId) {
			reply.type('application/json').code(1009);
			return HiddoutViewer.response({ comments: {} });
		}

		const queryObject: Object = {
			postId: { $eq: toDBId(realId) },
		};
		const result = await dbCollectionFindOne('comments', queryObject);
		reply.type('application/json').code(200);
		const comments = result ? result.comments : {};
		return HiddoutViewer.response({ comments: comments });
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
			reply.type('application/json').code(1009);
			return HiddoutViewer.response({ replied: false });
		}

		const timeNow = new Date().getTime();
		const update = await dbCollectionUpdateOne(
			'comments',
			{ postId: toDBId(realId) },
			{
				$push: {
					comments: {
						replyTo: req.body.replyTo,
						content: req.body.content,
						userId: req.user.userId,
						score: 0,
						up: 0,
						down: 0,
						lol: 0,
						createTime: timeNow,
						lastUpdateTime: timeNow,
					},
				},
			},
			{ upsert: true },
		);
		reply.type('application/json').code(200);
		return HiddoutViewer.response({ replied: update.result.ok });
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
					userId: { type: 'string' },
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
		onRequest: (request, reply, next) => {
			fastify.auth([fastify.verifyJWT])(request, reply, next);
		},
		handler: addCommentHandler,
	});

	next();
}

export { comments };
