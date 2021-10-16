const router = require('express').Router();

/************************
 * @Router /api/private *
 ************************/

router.use('/test', require('./test/adminRouter'));

module.exports = router;
