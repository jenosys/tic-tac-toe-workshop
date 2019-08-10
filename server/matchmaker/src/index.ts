const captureExit = require('capture-exit');

import './extension';
import app from './App';
import discovery from './discovery';

import env from './env';

captureExit.captureExit();

(async () => {
	// config.validate();

	const port = parseInt(process.env.PORT || '8888');

	console.log(`env: ${JSON.stringify(env, null, 2)}`);

	try {
		app.init();
		await app.bindRoutes();
		await discovery.init();
		app.run('0.0.0.0', port);

		const signals: NodeJS.Signals[] = [ 'SIGTERM' ];
		signals.forEach(signal => {
			process.on(signal, () => {
				console.info(`${signal} received`);
			});
		});
		
		captureExit.onExit(async () => {
			console.log('shutdown startig...');
			// await app.shutdown();
			console.log('server is down');
		});
	} catch (e) {
		console.error('error during initalizing: ', e);
		process.exit(-1);
	}
})();

//Error handler
process.on('uncaughtException', function (exception: Error) {
  // handle or ignore error
  console.log(exception);
});

