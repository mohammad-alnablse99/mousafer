const { catchAsync } = require('utils');
const validator = require('./validator');
const handler = require('./handler');
const router = require('express').Router();

/****************************
 * @Router /api/public/test *
 ****************************/

router.get('/', catchAsync(handler.getAll));

module.exports = router;
