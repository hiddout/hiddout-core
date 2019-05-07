//@flow
import { dbCollectionFind } from '../../db/client';
import {
	CONTENT_IS_NOT_HERE,
	SERVER_ERROR,
} from '../../static/serverMessage';
import { HiddoutViewer } from 'hiddout-viewer';


async function subscribePostHandler(req: Object, reply: Object): Object {

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
			//TODO: catch this request
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
		method: 'POST',
		url:'/user/subscribe/:postID/',
		schema: {
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
		onRequest: (request, reply, next) => {
			fastify.auth([fastify.verifyJWT])(request, reply, next);
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
