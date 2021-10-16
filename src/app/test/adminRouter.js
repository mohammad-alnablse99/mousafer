const { catchAsync } = require('utils');
const validator = require('./validator');
const handler = require('./handler');
const router = require('express').Router();

/********************************
 * @Router /api/private/test *
 ********************************/

//admin route
router.post('/', validator.save, catchAsync(handler.save));

//admin route
router.patch('/:id', validator.update, catchAsync(handler.update));

//admin route
router.delete('/:id', validator.paramId, catchAsync(handler.remove));

module.exports = router;
