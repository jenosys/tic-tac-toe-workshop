import app from './App';
import discovery from './discovery';

import config from './env';


(async () => {
	// config.validate();

	const port = parseInt(process.env.PORT || '8888');

	console.log('NODE_ENV: ' + (config.PRODUCTION ? 'production' : 'development'));

	try {
		app.init();
		await app.bindRoutes();
		await discovery.init();
		await app.run('0.0.0.0', port);
	} catch (e) {
		console.error('error during initalizing: ', e);
		process.exit(-1);
	}
})();

process.on('SIGTERM', async () => {
	console.info('SIGTERM signal received.');
	await app.shutdown();
	process.exit(0);
});