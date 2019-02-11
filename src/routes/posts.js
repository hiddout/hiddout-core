//@flow

import MongoClient from 'mongodb'

import { dbUrl, dbName } from '../config/dbconfig'

async function get_post_handler(req, reply) {
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

async function add_post_handler(req, reply) {
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

function posts(fastify, opts, next) {
	fastify.get('/posts', get_post_handler);
	fastify.post('/posts', add_post_handler);
	next();
}

export default posts;