const fs = require( "fs");
const isDev = require( "../utils/isDev");

const homeController = ( req, res, next) => {
	try {
		const homePage = fs.readFileSync( "./public/index.html").toString( "utf-8");
		
		if( !isDev()) {
			res.header( "Cache-Control", "private");
			res.header( "Cache-Control", `max-age=${ 60 * 60 * 24 * 30}`);	// seconds of month
		}

		res.setHeader( "Content-Type", "text/html");
		res.flushHeaders();
		res.status( 200).end( homePage);
	} catch( err) {
		next( err);
	}
};

module.exports = homeController;
