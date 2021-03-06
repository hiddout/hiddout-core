// @flow

import * as fsExtra from 'fs-extra';
import * as path from 'path';

const rootPath = process.cwd();

const configFolderPath =
	process.env.NODE_ENV === 'DEV' ? 'devConfig' : 'serverConfig';

const { CORSOrigin,  port, dbUrl, dbName, adminDBName, secret, swaggerOptions } = fsExtra.readJsonSync(
	path.join(rootPath, configFolderPath, 'config.json'),
);

export { CORSOrigin, port, dbUrl, dbName, adminDBName, secret, swaggerOptions };
