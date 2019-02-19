//@flow
import MongoClient from 'mongodb';

import { dbUrl, dbName } from '../config/dbconfig';

async function clean(req: Object, reply: Object): Object {
	const collections = ['posts', 'boards', 'users', 'comments'];
	
	for (let collection of collections) {
		let client;
		try {
			client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
		} catch (err) {
			console.log('Connection Error!');
			console.log(err);
		}

		try {
			const db = client.db(dbName);
			await db.collection(collection).drop();
			console.log(`Collection ${collection} deleted.`);
		} catch (err) {
			console.log(`Collection ${collection} error, ${err.codeName}.`);
		} finally {
			await client.close();
		}
	}
}

clean();
