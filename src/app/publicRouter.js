const router = require('express').Router();

/*******************
 * @Router /public *
 *******************/

router.use('/auth', require('./auth/publicRouter'));

router.use('/test', require('./test/publicRouter'));

module.exports = router;
