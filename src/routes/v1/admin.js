//@flow
import { dbCollectionFind, dbCollectionUpdateOne, toDBId } from '../../db/client';
import { SERVER_ERROR, CONTENT_IS_NOT_HERE } from '../../static/serverMessage';
import { HiddoutViewer } from 'hiddout-viewer';

async function lockPostHandler(req: Object, reply: Object): Object {
	try {
		const realId = HiddoutViewer.getId(req.params.postId);

		if (!realId) {
			reply.type('application/json').code(404);
			return HiddoutViewer.response({ msg: CONTENT_IS_NOT_HERE });
		}

		const id = toDBId(realId);

		const result = await dbCollectionFind('posts', {
			_id: { $eq: id },
		});

		const lockedPost = result[0];

		lockedPost.isLock = true;

		const update = await dbCollectionUpdateOne(
			'posts',
			{ _id: id },
			{
				$set: lockedPost,
			},
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
