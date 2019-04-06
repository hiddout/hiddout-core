declare var fastify: any;

declare module 'fastify' {
	declare export default any;
}

declare module 'fastify-cors' {
	declare export default any;
}

declare module 'mongodb' {
	declare export default any;
	declare export var ObjectId: any;
}

declare module 'hiddout-viewer' {
	declare export default any;
	declare export var HiddoutViewer: any;
}

declare module 'fastify-swagger' {
	declare export default any;
}

declare module 'fastify-static' {
	declare export default any;
}

declare module 'fastify-jwt' {
	declare export default any;
}

declare module 'fastify-auth' {
	declare export default any;
}

declare module 'fastify-rate-limit' {
	declare export default any;
}

declare module 'fs-extra' {
	declare export default any;
	declare export var readJsonSync: any;
}

declare module 'sjcl' {
	declare export default any;
	declare export var random: any;
	declare export var codec: any;
	declare export var misc: any;
}
