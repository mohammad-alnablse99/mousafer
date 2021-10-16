require('configKeys');
const { database, Exception, logger } = require('utils');

database
	.init()
	.then(() => {
		const { port } = require('configKeys');
		const express = require('express');
		const path = require('path');

		//load plugins
		require('./app/plugin');

		const passport = require('./app/auth/passport');

		const app = express();

		app.get('/welcome-test', (req, res) => res.status(200).json({ msg: 'welcome' }));

		app.use('/assets', express.static(path.join('assets', 'public')));

		app.use(express.urlencoded({ extended: false }));
		app.use(express.json({ limit: '50mb' }));
		app.use(express.text({ limit: '50mb' }));

		app.use(logger.httpLogger);

		app.use(require('./app/auth/passport').initialize());

		app.use('/api/public', require('./app/publicRouter'));

		app.use(
			'/api/private/admin',
			passport.authenticate('jwtAdmin', { session: false }),
			require('./app/adminRouter')
		);

		app.use(Exception.requestDefaultHandler);
		app.listen(Number(process.env.PORT) || 4433, () => {
			console.info(`Server is listening on port ${port}`);
		});
	})
	.catch(Exception.defaultHandler);
