//@flow

import { SUCCESS,CONTENT_IS_NOT_HERE } from '../../static/serverMessage';
import { dbCollectionFind, dbCollectionInsertOne, toDBId } from '../../db/client';
import { HiddoutViewer } from 'hiddout-viewer';

async function getPostsHandler(req: Object, reply: Object): Object {
	try {
		const board: string = req.query.board;
		const queryObject: Object = board ? { 'board': { $eq: board  }} : {};
		const result = await dbCollectionFind('posts', queryObject);
		reply.type('application/json').code(200);
		return HiddoutViewer.response({ 'posts': result, 'msg': SUCCESS });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { 'msg': err };
	}
}

async function getPostHandler(req: Object, reply: Object): Object{
	try {
		const queryObject: Object = { _id: toDBId(HiddoutViewer.getId(req.params.postId))  };
		const result = await dbCollectionFind('posts', queryObject);

		if(!result.length){
			reply.type('application/json').code(404);
			return HiddoutViewer.response({ 'post': null, 'msg': CONTENT_IS_NOT_HERE });
		}

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ 'post': result[0], 'msg': SUCCESS });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { 'msg': err };
	}
}

async function addPostHandler(req: Object, reply: Object): Object {
	try {
		if (req.body.postId == null) {
			const timeNow = new Date().getTime();

			const result = await dbCollectionInsertOne('posts',{
				title: req.body.title,
				content: req.body.content,
				board: req.body.board,
				userId: req.body.userId,
				createTime: timeNow,
				lastUpdateTime: timeNow,
			});

			reply.type('application/json').code(200);
			return { 'insertedId': result.insertedId, 'msg': SUCCESS };
		}
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: err };
	}
}

function posts(fastify: fastify, opts: Object, next: ()=> any):void{
	fastify.route({
		method: 'GET',
		url: '/post/:postId',
		schema: {
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
					},
				},
			},
		},
		handler: getPostHandler,
	});

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
						encryptedData: { type: 'string' },
					},
				},
			},
		},
		handler: getPostsHandler,
	});

	fastify.route({
		method: 'POST',
		url: '/posts',
		schema: {
			querystring: {
				title: { type: 'string' },
				content: { type: 'string' },
				board: { type: 'string' },
				userId: { type: 'string' },
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
