const authMiddleware = ( req, res, next) => {
	const auth = {
		login: process.env[ "LOGIN"],
		password: process.env[ "PASS"]
	}
  
	const b64auth = ( req.headers.authorization || "").split(" ")[1] || "";
	const [ login, password] = Buffer.from( b64auth, "base64").toString().split( ":");
  
	// Verify login and password are set and correct
	if( login && password && login === auth.login && password === auth.password) {
		return next()
	}

	res.set( "WWW-Authenticate", "Basic realm=\"401\"")
	res.status( 401).send( "Authentication required");
	res.end();
};

module.exports = authMiddleware;