//@flow
import MongoClient,{ObjectId} from 'mongodb';

import { dbUrl, dbName, adminDBName } from '../config';

export function toDBId(Id: string){
	return ObjectId(Id);
}

export async function dbCollectionFind(collection: string, queryObject: Object, options?: Object): any {
	const db = await getDB();
	return await db.collection(collection).find(queryObject, options).toArray();
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

export async function isAdminUser(name: string): any {
	const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
	const db = client.db(adminDBName);
	const result = await db.collection('founders').find({name: {$eq: name}}).toArray();
	return !!result.length;
}