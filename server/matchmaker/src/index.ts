import App from './App';

import config from './env';


(async () => {
	// config.validate();

	const port = parseInt(process.env.PORT || '8888');

	console.log('NODE_ENV: ' + (config.PRODUCTION ? 'production' : 'development'));

	App.init();
	await App.bindRoutes();
	
	await App.run('0.0.0.0', port);
})();

process.on('SIGTERM', async () => {
	console.info('SIGTERM signal received.');
	await App.shutdown();
	process.exit(0);
});