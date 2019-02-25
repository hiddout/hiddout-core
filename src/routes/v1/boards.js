//@flow
import { dbCollectionFind } from '../../db/client';
import { SUCCESS } from '../../static/serverMessage';

async function getBoardsHandler(req: Object, reply: Object): Object {
	try {
		const result = await dbCollectionFind('boards', {});
		reply.type('application/json').code(200);
		return { boards: result, msg: SUCCESS };
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(200);
		return { boards: null, msg: err.name };
	}
}

function boards(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'GET',
		url: '/boards',
		schema: {
			response: {
				'200': {
					type: 'object',
					properties: {
						msg: { type: 'string' },
						boards: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									_id: { type: 'string' },
									name: { type: 'string' },
								},
							},
						},
					},
				},
			},
		},
		handler: getBoardsHandler,
	});

	next();
}

export { boards };
