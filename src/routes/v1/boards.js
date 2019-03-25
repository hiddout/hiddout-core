//@flow
import { dbCollectionFind } from '../../db/client';
import { SUCCESS } from '../../static/serverMessage';
import {HiddoutViewer} from 'hiddout-viewer';

async function getBoardsHandler(req: Object, reply: Object): Object {
	try {
		const result = await dbCollectionFind('boards', {});
		reply.type('application/json').code(200);
		return HiddoutViewer.response({ boards: result, msg: SUCCESS });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err };
	}
}

function boards(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'GET',
		url: '/boards',
		schema: {
			querystring: {
				timeStamp: { type: 'number' },
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
		handler: getBoardsHandler,
	});

	next();
}

export { boards };
