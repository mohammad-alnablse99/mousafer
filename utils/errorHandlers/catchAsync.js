/**
 *
 * @param  {...function} fns
 */
const catchAsync = (...fns) => (req, res, next) => fns.map((fn) => fn(req, res, next).catch(next));
module.exports = catchAsync;
