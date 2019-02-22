//@flow

import { SUCCESS } from '../../static/serverMessage';
import { dbCollectionFindOne, dbCollectionUpdateOne } from '../../db/client';

async function getCommentsHandler(req: Object, reply: Object): Object {
	try {
		const queryObject: Object = { postid: { $eq: req.params.postId } };
		const result = await dbCollectionFindOne('comments', queryObject);
		reply.type('application/json').code(200);
		const comments = result ? result.comments : {};
		return { comments: comments, msg: SUCCESS };
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(200);
		return { comments: null, msg: err.name };
	}
}

async function addCommentHandler(req: Object, reply: Object): Object {
	try {
		if (req.body.postid == null) {
			const timeNow = new Date().getTime();
			const result = await dbCollectionUpdateOne(
				'comments',
				{ postid: req.params.postId },
				{
					$push: {
						comments: {
							content: req.body.content,
							userid: req.body.userid,
							createtime: timeNow,
							lastupdatetime: timeNow,
						},
					},
				},
				{ upsert: true },
			);
			reply.type('application/json').code(200);
			return { ok: result.result.ok, msg: SUCCESS };
		}
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err.errmsg };
	}
}

function comments(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'GET',
		url: '/posts/:postId/comments',
		schema: {
			response: {
				'200': {
					type: 'object',
					properties: {
						msg: { type: 'string' },
						comments: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									content: { type: 'string' },
									userid: { type: 'string' },
									createtime: { type: 'string' },
									lastupdatetime: { type: 'string' },
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
		url: '/posts/:postId/comments',
		schema: {
			querystring: {
				content: { type: 'string' },
				userid: { type: 'string' },
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						ok: { type: 'string' },
						msg: { type: 'string' },
					},
				},
			},
		},
		handler: addCommentHandler,
	});

	next();
}

export { comments };
