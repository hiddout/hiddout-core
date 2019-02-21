//@flow
import MongoClient from 'mongodb';

import { dbUrl, dbName } from '../../config/dbconfig';

async function getCommentsHandler(req: Object, reply: Object): Object {
	try {
		const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
		const db = client.db(dbName);
		const queryObject: Object = { 'postid': { $eq: req.params.postId  }};
		const r = await db.collection('comments').findOne(queryObject);
		reply.type('application/json').code(200);
		const comments = r ? r.comments : {};
		return { 'comments': comments, 'msg': 'SUCCESS' };
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(200);
		return { 'comments': null, 'msg': err.name };
	}
}

async function addCommentHandler(req: Object, reply: Object): Object {
	try {
		const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
		const db = client.db(dbName);
		if (req.body.postid == null) {
			const timenow = new Date().getTime();
			let r = await db.collection('comments').update(
				{ postid: req.params.postId },
				{ $push: { comments: {
					content: req.body.content,
					userid: req.body.userid,
					createtime: timenow,
					lastupdatetime: timenow,
					}},
				},
				{ upsert: true },
			);
			reply.type('application/json').code(200);
			return { 'ok': r.result.ok, 'msg': 'SUCCESS' };
		}
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { 'msg': err.errmsg };	
	}
}

function comments(fastify: fastify, opts: Object, next: ()=> any):void{
	fastify.route({
		method: 'GET',
		url: '/posts/:postId/comments',
		schema: {
			response: {
				'200': {
					type: 'object',
					properties: {
						msg: { type: 'string' },
						comments: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									content: { type: 'string' },
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
		handler: getCommentsHandler,
	});

	fastify.route({
		method: 'POST',
		url: '/posts/:postId/comments',
		schema: {
			querystring: {
				content: { type: 'string' },
				userid: { type: 'string' },
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						ok: { type: 'string' },
						msg: { type: 'string' },
					},
				},
			},
		},
		handler: addCommentHandler,
	});

	next();
}

export default comments;
