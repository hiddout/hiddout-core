//@flow
import { dbCollectionFind, dbCollectionInsertOne, dbCollectionUpdateOne, toDBId } from '../../db/client';
import {
	CONTENT_IS_NOT_HERE,
	SERVER_ERROR,
} from '../../static/serverMessage';
import { HiddoutViewer } from 'hiddout-viewer';

const TYPE_POST = 'post';

async function getSubscriptionMessageHandler(req: Object, reply: Object): Object {

	try {
		const result = await dbCollectionFind('subscriptions', {
			userId: { $eq: req.user.userId },
		});

		const subscriptions = [];

		if(result.length) {
			const subscription = result[0].subscription;
			for (let index = 0; index < subscription.length; ++index){

				let queryResult = null;
				switch (subscription[index].type) {
					case TYPE_POST:
						queryResult = await dbCollectionFind('posts', { _id: toDBId(subscription[index].subscriptionId) });
						if(queryResult[0].lastUpdateTime > subscription[index].lastUpdateTime ) {
							subscriptions.push({type:TYPE_POST, content: queryResult[0].title, subscriptionId: queryResult[0]._id});
						}
						break;
					default:
						break;
				}
			}
		}

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ subscriptions: subscriptions });
	}catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

async function subscribePostHandler(req: Object, reply: Object): Object {
	try {
		const realId = HiddoutViewer.getId(req.params.postId);

		const result = await dbCollectionFind('subscriptions', {
			userId: { $eq: req.user.userId },
		});

		const timeNow = new Date().getTime();

		let postSubscription = {
			subscription: [
				{
					type: req.body.type,
					subscriptionId: realId,
					lastUpdateTime: timeNow,
				},
			],
		},update = null;

		if(result.length) {

			postSubscription = result[0];
			const subscription = postSubscription.subscription;
			for(let index = 0; index < subscription.length; ++index){
				if (subscription[index].subscriptionId === realId) {
					if(req.body.isSubscribed){
						postSubscription.subscription[index].lastUpdateTime = timeNow;
					} else {
						postSubscription.subscription.splice( index, 1);
					}

					break;
				}
			}

			update = await dbCollectionUpdateOne(
				'subscriptions',
				{ userId: req.user.userId },
				{
					$set: postSubscription,
				},
			);
		}

		if (!update) {
			update = await dbCollectionInsertOne('subscriptions', postSubscription);
		}

		reply.type('application/json').code(200);
		return HiddoutViewer.response({ subscribed: update.result.ok });
	}catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

async function getUserHandler(req: Object, reply: Object): Object {
	try {
		const realId = HiddoutViewer.getId(req.params.userId);
		if (!realId) {
			reply.type('application/json').code(404);
			return HiddoutViewer.response({ msg: CONTENT_IS_NOT_HERE });
		}
		const queryObject: Object = { user: { $eq: realId } };
		const result = await dbCollectionFind('users', queryObject);
		if (!result.length) {
			reply.type('application/json').code(404);
			return HiddoutViewer.response({ msg: CONTENT_IS_NOT_HERE });
		}
		reply.type('application/json').code(200);
		const userData = result[0];
		const user = {
			userId: userData.user,
			joinTime: userData.joinTime,
		};
		return HiddoutViewer.response({ user });
	} catch (err) {
		console.log(err.stack);
		reply.type('application/json').code(500);
		return { msg: SERVER_ERROR };
	}
}

function users(fastify: fastify, opts: Object, next: () => any): void {
	fastify.route({
		method: 'GET',
		url:'/user/subscription',
		schema: {
			body: {
				type: 'object',
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						subscriptions: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									type: { type: 'string' },
									content: { type: 'string' },
									subscriptionId: { type: 'string' },
								},
							},
						},
					},
				},
			},
		},
		handler: getSubscriptionMessageHandler,
	});

	fastify.route({
		method: 'POST',
		url:'/user/subscribe/:postId',
		schema: {
			body: {
				type: 'object',
				properties: {
					isSubscribed: { type: 'boolean' },
					type: {type:'string'},
				},
				required: [ 'isSubscribed'],
			},
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						subscribed: { type: 'boolean' },
					},
				},
			},
		},
		onRequest:(request, reply, done) => {
			fastify.verifyJWT(request, reply, done);
		},
		handler: subscribePostHandler,
	});

	fastify.route({
		method: 'GET',
		url: '/user/:userId',
		schema: {
			response: {
				'200': {
					type: 'object',
					properties: {
						encryptedData: { type: 'string' },
						userData: {
							type:'object',
							properties: {
								userId: { type: 'string' },
								joinTime: {type: 'number'},
							},
						},
					},
				},
			},
		},
		handler: getUserHandler,
	});

	next();
}

export { users };
