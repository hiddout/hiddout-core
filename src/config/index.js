import * as fsExtra from 'fs-extra';
import * as path from 'path';

const rootPath = process.cwd();

const configFolderPath =
	process.env.NODE_ENV === 'DEV' ? 'devConfig' : 'serverConfig';

const { port, dbUrl, dbName, swaggerOptions } = fsExtra.readJsonSync(
	path.join(rootPath, configFolderPath, 'config.json'),
);

export { port, dbUrl, dbName, swaggerOptions };
