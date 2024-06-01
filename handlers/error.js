const isDev = require( "../utils/isDev");

const notFound = ( req, res, next) => {
	res.status( 404);
	next( new Error( `not found - ${ req.originalUrl}`));
};

const errorHandler = ( err, req, res, next) => {	
	console.error( err.message, err);
	
	if( res.statusCode == 200) res.status( 500);
	
	res.status( res.statusCode || 500);
	
	const stack = isDev() ? err.stack : undefined;
	
	res.json( {
		message: err.message,
		stack
	});
};

module.exports = {
	notFound,
	errorHandler
};