import { dbCollectionFind, dbCollectionInsertOne, dbCollectionUpdateOne, toDBId } from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';
import { SERVER_ERROR } from '../../static/serverMessage';

async function reactPostHandler(req: Object, reply: Object): Object {
	try {

		const id = toDBId(HiddoutViewer.getId(req.params.postId));

		const result = await dbCollectionFind('reactions', {
			postId: {$eq: id},
		});

		let postReaction = {
			postId: id,
			reactions:[{
				userId: req.body.userId,
				reaction: req.body.reaction,
			}],
		}, update = null;

		if(result.length) {
			postReaction = result[0];
			const reactions = postReaction.reactions;
			for(let index = 0; index < reactions.length; ++index) {
				const react = reactions[index];
				if(react.userId === req.body.userId) {
					postReaction.reactions[index].reaction = req.body.reaction;
					break;
				}
			}

			update = await dbCollectionUpdateOne(
				'reactions',
				{ postId: id },
				{
					$set: postReaction,
				},
			);
		}

		if(!update) {
			update = await dbCollectionInsertOne('reactions', postReaction);
		}

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ reacted: update.result.ok });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

function reactions(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'POST',
		url: '/post/:postId/react',
		schema: {
			body: {
				type: 'object',
				properties: {
					userId: { type: 'string' },
					reaction: { type: 'string' },
				},
				required: ['userId', 'reaction'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						reacted: { type: 'boolean' },
					},
				},
			},
		},
		onRequest: (request, reply, next) => {
			fastify.auth([fastify.verifyJWT])(request, reply, next);
		},
		handler: reactPostHandler,
	});

	next();
}

export { reactions };
