import { port } from './config';

const swaggerOptions = {
	routePrefix: '/documentation',
	exposeRoute: true,
	swagger: {
		info: {
			title: 'Fastify API',
			description: 'hiddout-core',
			version: '1.0.0',
		},
		externalDocs: {
			url: 'https://swagger.io',
			description: 'Find more info here',
		},
		host: `127.0.0.1:${port}`,
		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json'],
	},
};

export default swaggerOptions;
