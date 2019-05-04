//@flow
import { dbCollectionFind } from '../../db/client';
import { SERVER_ERROR, SUCCESS } from '../../static/serverMessage';
import { HiddoutViewer } from 'hiddout-viewer';

async function getBoardsHandler(req: Object, reply: Object): Object {
	try {
		const queryObject: Object = { name: { $eq: req.query.name } };
		const result = await dbCollectionFind('boards', queryObject);
		if (!result.length) {
			reply.type('application/json').code(404);
			return HiddoutViewer.response({ msg: SUCCESS });
		}
		reply.type('application/json').code(200);
		return HiddoutViewer.response({ msg: SUCCESS });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

function boards(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'GET',
		url: '/boards',
		schema: {
			querystring: {
				name: { type: 'string' },
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						msg: { type: 'string' },
					},
				},
			},
		},
		handler: getBoardsHandler,
	});

	next();
}

export { boards };
