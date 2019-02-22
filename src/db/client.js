//@flow
import MongoClient from 'mongodb';

import { dbUrl, dbName } from '../config';



export async function dbCollectionFind(collection: string, queryObject: Object): any {
	return await getDB().collection(collection).find(queryObject).toArray();
}

export async function dbCollectionFindOne(collection: string, queryObject: Object): any {
	return await getDB().collection(collection).findOne(queryObject);
}

export async function dbCollectionUpdateOne(collection: string, ...queryObject:any): any {
	return await getDB().collection(collection).updateOne(queryObject);
}

export async function dbCollectionInsertOne(collection: string, queryObject: Object): any {
	return await getDB().collection(collection).insertOne(queryObject);
}

async function getDB(): any {
	const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
	return client.db(dbName);
}