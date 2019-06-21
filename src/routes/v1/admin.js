//@flow
import { dbCollectionUpdateOne, toDBId } from '../../db/client';
import { SERVER_ERROR } from '../../static/serverMessage';
import { HiddoutViewer } from 'hiddout-viewer';

async function deletePostHandler(req: Object, reply: Object): Object {
	try {
		const id = toDBId(req.params.postId);

		const timeNow = new Date().getTime();

		const update = await dbCollectionUpdateOne('posts',
			{_id: id},
			{$set: {
					title: 'N/A',
					content: 'N/A',
					board: 'N/A',
					userId: 'N/A',
					score: 0,
					up: 0,
					down: 0,
					lol: 0,
					isLocked: true,
					lockedFor: 'N/A',
					createTime: timeNow,
					lastUpdateTime: timeNow,
				}},
		);

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ deleted: update.result.ok });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

async function movePostHandler(req: Object, reply: Object): Object {
	try {

		const id = toDBId(req.params.postId);

		const update = await dbCollectionUpdateOne('posts',
			{_id: id},
			{$set: { board: req.body.moveTo } },
		);

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ moved: update.result.ok });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

async function lockPostHandler(req: Object, reply: Object): Object {
	try {
		const id = toDBId(req.params.postId);

		const update = await dbCollectionUpdateOne('posts',
			{_id: id},
			{$set: { isLocked: true, lockedFor: req.body.reason} },
		);

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ locked: update.result.ok });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

function admin(fastify: fastify, opts: Object, next: () => any): void {

	fastify.route({
		method: 'POST',
		url: '/post/:postId/delete',
		schema: {
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						deleted: { type: 'boolean' },
					},
				},
			},
		},
		onRequest:(request, reply, done) => {
			fastify.verifyAdminJWT(request, reply, done);
		},
		handler: deletePostHandler,
	});

	fastify.route({
		method: 'POST',
		url: '/post/:postId/move',
		schema: {
			body: {
				type: 'object',
				properties: {
					moveTo: { type: 'string' },
				},
				required: ['moveTo'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						moved: { type: 'boolean' },
					},
				},
			},
		},
		onRequest:(request, reply, done) => {
			fastify.verifyAdminJWT(request, reply, done);
		},
		handler: movePostHandler,
	});

	fastify.route({
		method: 'POST',
		url: '/post/:postId/lock',
		schema: {
			body: {
				type: 'object',
				properties: {
					reason: { type: 'string' },
				},
				required: ['reason'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						locked: { type: 'boolean' },
					},
				},
			},
		},
		onRequest:(request, reply, done) => {
			fastify.verifyAdminJWT(request, reply, done);
		},
		handler: lockPostHandler,
	});

	next();
}

export { admin };
