//@flow
import MongoClient,{ObjectId} from 'mongodb';

import { dbUrl, dbName } from '../config';

export function toDBId(Id: string){
	return ObjectId(Id);
}

export async function dbCollectionCount(collection: string):Promise<number> {
	const db = await getDB();
	return await db.collection(collection).countDocuments();
}

export async function dbCollectionFind(collection: string, queryObject: Object): any {
	const db = await getDB();
	return await db.collection(collection).find(queryObject).toArray();
}

export async function dbCollectionFindOne(collection: string, queryObject: Object): any {
	const db = await getDB();
	return db.collection(collection).findOne(queryObject);
}

export async function dbCollectionUpdateOne(collection: string, ...queryObject:any): any {
	const db = await getDB();
	return await db.collection(collection).updateOne(...queryObject);
}

export async function dbCollectionInsertOne(collection: string, queryObject: Object): Promise<any> {
	const db = await getDB();
	return await db.collection(collection).insertOne(queryObject);
}

async function getDB(): any {
	const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
	return client.db(dbName);
}