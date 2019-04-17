//@flow

import { dbCollectionFindOne, dbCollectionUpdateOne, toDBId } from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';

async function getCommentsHandler(req: Object, reply: Object): Object {
	try {
		const queryObject: Object = { postId: { $eq: toDBId(HiddoutViewer.getId(req.params.postId)) } };
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
			const timeNow = new Date().getTime();
			const result = await dbCollectionUpdateOne(
				'comments',
				{ postId: toDBId(HiddoutViewer.getId(req.params.postId)) },
				{
					$push: {
						comments: {
							replyTo: req.body.replyTo,
							content: req.body.content,
							userId: req.body.userId,
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
			return HiddoutViewer.response({ replied: result.result.ok });
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
					replyTo: {type: 'number'},
				},
				required: ['content', 'replyTo', 'userId'],
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
		preHandler: fastify.auth([
			fastify.verifyJWT,
		]),
		handler: addCommentHandler,
	});

	next();
}

export { comments };
