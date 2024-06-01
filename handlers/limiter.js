const { rateLimit} = require( "express-rate-limit");
const { LIMIT_WIN, LIMIT_CNT} = require( "../config");

module.exports = rateLimit( {
	windowMs: LIMIT_WIN,
	limit: LIMIT_CNT,
	message: "Too Many Requests!"
});
