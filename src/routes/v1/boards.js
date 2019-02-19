//@flow
import MongoClient from 'mongodb';

import { dbUrl, dbName } from '../../config/dbconfig';

async function getBoardsHandler(req: Object, reply: Object): Object {
	try {
		const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
		const db = client.db(dbName);
		const r = await db.collection('boards').find({}).toArray();
		reply.type('application/json').code(200);
		return { 'boards': r, 'msg': 'SUCCESS' };
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(200);
		return { 'boards': null, 'msg': err.name };
	}
}

function boards(fastify: fastify, opts: Object, next: ()=> any):void{
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

export default boards;
