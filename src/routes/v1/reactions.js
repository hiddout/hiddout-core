import {
	dbCollectionFind,
	dbCollectionInsertOne,
	dbCollectionUpdateOne,
	toDBId,
} from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';
import { SERVER_ERROR } from '../../static/serverMessage';

const REACT_UP = 'up';
const REACT_DOWN = 'down';
const REACT_LOL = 'lol';

async function getPostReactionsHandler(req: Object, reply: Object): Object {
	try {
		const realId = HiddoutViewer.getId(req.params.postId);
		if (!realId) {
			reply.type('application/json').code(200);
			return HiddoutViewer.response({ reactions: [] });
		}
		const id = toDBId(realId);

		const result = await dbCollectionFind('reactions', {
			postId: { $eq: id },
		});

		let postReactions = [];

		if (result.length) {
			postReactions = result[0].reactions;
		}

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ reactions: postReactions });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

async function reactPostHandler(req: Object, reply: Object): Object {
	try {
		const realId = HiddoutViewer.getId(req.params.postId);
		if (!realId) {
			reply.type('application/json').code(200);
			return HiddoutViewer.response({ reacted: false });
		}
		const id = toDBId(realId);

		const result = await dbCollectionFind('reactions', {
			postId: { $eq: id },
		});

		let postReaction = {
				postId: id,
				reactions: [
					{
						userId: req.user.userId,
						reaction: req.body.reaction,
					},
				],
			},
			update = null;

		if (result.length) {
			postReaction = result[0];
			const reactions = postReaction.reactions;
			for (let index = 0; index < reactions.length; ++index) {
				const react = reactions[index];
				if (react.userId === req.user.userId) {
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

		if (!update) {
			await dbCollectionInsertOne('reactions', postReaction);
		}

		const scoreResult = calculateScore(postReaction.reactions);

		const posts = await dbCollectionFind('posts', {
			_id: { $eq: id },
		});

		update = await dbCollectionUpdateOne(
			'posts',
			{
				_id: id,
			},
			{
				$set: {
					...posts[0],
					...scoreResult,
				},
			},
		);

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ reacted: update.result.ok });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

function calculateScore(reactions: Array<Object>): Object {
	let ups = 0,
		downs = 0,
		lols = 0;

	for (const reactInfo of reactions) {
		switch (reactInfo.reaction) {
			case REACT_UP:
				ups++;
				break;
			case REACT_DOWN:
				downs++;
				break;
			case REACT_LOL:
				lols++;
				break;
			default:
				break;
		}
	}

	return {
		score: ups - downs / 2 + lols / 3,
		up: ups,
		down: downs,
		lol: lols,
	};
}

function reactions(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'GET',
		url: '/post/:postId/reactions',
		schema: {
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						reactions: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									userId: { type: 'string' },
									reaction: { type: 'string' },
								},
							},
						},
					},
				},
			},
		},
		handler: getPostReactionsHandler,
	});

	fastify.route({
		method: 'POST',
		url: '/post/:postId/reactions',
		schema: {
			body: {
				type: 'object',
				properties: {
					reaction: { type: 'string' },
				},
				required: [ 'reaction'],
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
		onRequest:(request, reply, done) => {
			fastify.verifyJWT(request, reply, done);
		},
		handler: reactPostHandler,
	});

	next();
}

export { reactions };
