//@flow
import MongoClient from 'mongodb';

import { dbUrl, dbName } from '../config/dbconfig';

async function clean(req: Object, reply: Object): Object {
	try {
		const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
		const db = client.db(dbName);
		await db.collection('posts').drop();
		console.log('dropped');
		await db.collection('boards').drop();
		console.log('dropped');
	} catch (err) {
		console.log('not found');
	}
}

clean();
