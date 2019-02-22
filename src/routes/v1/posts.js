//@flow

import { SUCCESS } from '../../static/serverMessage';
import { dbCollectionFind, dbCollectionInsertOne } from '../../db/client';

async function getPostHandler(req: Object, reply: Object): Object {
	try {
		const board: string = req.query.board;
		const queryObject: Object = board ? { 'board': { $eq: board  }} : {};
		const result = dbCollectionFind('posts',queryObject);
		reply.type('application/json').code(200);
		return { 'posts': result, 'msg': SUCCESS };
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(200);
		return { 'posts': null, 'msg': err.name };
	}
}

async function addPostHandler(req: Object, reply: Object): Object {
	try {
		if (req.body.postid == null) {
			const timeNow = new Date().getTime();

			const result = await dbCollectionInsertOne('post',{
				title: req.body.title,
				content: req.body.content,
				board: req.body.board,
				userid: req.body.userid,
				createtime: timeNow,
				lastupdatetime: timeNow,
			});

			reply.type('application/json').code(200);
			return { 'insertedId': result.insertedId, 'msg': SUCCESS };
		}
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { 'insertedId': null, 'msg': err.stack };
	}
}

function posts(fastify: fastify, opts: Object, next: ()=> any):void{
	fastify.route({
		method: 'GET',
		url: '/posts',
		schema: {
			querystring: {
				board: { type: 'string' },
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						msg: { type: 'string' },
						posts: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									_id: { type: 'string' },
									title: { type: 'string' },
									content: { type: 'string' },
									board: { type: 'string' },
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
		handler: getPostHandler,
	});

	fastify.route({
		method: 'POST',
		url: '/posts',
		schema: {
			querystring: {
				title: { type: 'string' },
				content: { type: 'string' },
				board: { type: 'string' },
				userid: { type: 'string' },
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						insertedId: { type: 'string' },
						msg: { type: 'string' },
					},
				},
			},
		},
		handler: addPostHandler,
	});

	next();
}

export {posts};
