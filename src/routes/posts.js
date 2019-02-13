//@flow
import MongoClient from 'mongodb';

import { dbUrl, dbName } from '../config/dbconfig';

async function getPostHandler(req: Object, reply: Object): Object {
	try {
		const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
		const db = client.db(dbName);
		let r;
		if (req.query.board == null) {
			r = await db.collection('posts').find({}).toArray();	
		} else {
			r = await db.collection('posts').find({ 'board': { $eq: req.query.board } }).toArray();	
		}
		reply.type('application/json').code(200);
		return r;
	} catch (err) {
		console.log(err.stack);
	}
}

async function addPostHandler(req: Object, reply: Object): Object {
	try {
		const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
		const db = client.db(dbName);
		
		if (req.body.postid == null) {
			let timenow = new Date();
			let r = await db.collection('posts').insertOne({
				title: req.body.title,
				content: req.body.content,
				board: req.body.board,
				userid: req.body.userid,
				createtime: timenow,
				lastupdatetime: timenow,
			});
			if ('writeConcernError' in r) {
				reply.type('application/json').code(500);
				return { 'nInserted': 0, 'msg': 'DB_INSERT_ERROR' };
			} else {
				reply.type('application/json').code(200);
				return { 'nInserted': r.nInserted, 'msg': 'SUCCESS' };
			}
		}
	} catch (err) {
		console.log(err.stack);
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
				200: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
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
				200: {
					type: 'object',
					properties: {
						nInserted: { type: 'int' },
						msg: { type: 'string' },
					},
				},
			},
		},
		handler: addPostHandler,
	});
	next();
}

export default posts;
