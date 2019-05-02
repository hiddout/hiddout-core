const download = require('download');
const path = require('path');

const fsExtra = require('fs-extra');

const rootPath = process.cwd();

const publicPath = path.join(rootPath, 'public');
fsExtra.emptyDirSync(publicPath);

Promise.all([
	'https://github.com/hiddout/hiddout-client/raw/master/dist/public.zip',
].map(x => download(x, rootPath, {
	extract: true,
	headers: {accept: 'application/zip'},
}).catch(error => {
	throw error;
})));