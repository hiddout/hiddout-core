//@flow
import type fastify from 'fastify';
import MongoClient from 'mongodb'

import { dbUrl, dbName } from '../config/dbconfig'

async function getPostHandler(req: Object, reply: Object): Object {
	try {
		const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
		console.log("Connected correctly to server");
		const db = client.db(dbName);
		let r = await db.collection("posts").find({}).toArray();
		reply.type('application/json').code(200);
		return { hello: r };
	} catch (err) {
		console.log(err.stack);
	}
};

async function addPostHandler(req: Object, reply: Object): Object {
	try {
		const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
		console.log("Connected correctly to server");
		const db = client.db(dbName);
		let r = await db.collection("posts").insertOne({
			title: req.body.title,
			content: req.body.content
		});
		reply.type('application/json').code(200);
		return { hello: r };
	} catch (err) {
		console.log(err.stack);
	}
};

function posts(fastify: fastify, opts: Object, next: ()=> any):void{
	fastify.get('/posts', getPostHandler);
	fastify.post('/posts', addPostHandler);
	next();
}

export default posts;
