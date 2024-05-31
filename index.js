const { randomInt, randomBytes} = require( "crypto");
const fs = require( "fs");
const { createServer} = require( "http");
const express = require( "express");
const axios = require( "axios");

const app =  express();

app.use( "/static", express.static( "./public"));

app.use( ( req, res, next) => {
	const auth = {
		login: 'alii',
		password: '5667'
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
});

app.get( "/", ( req, res) => {
	try {
		const home = fs.readFileSync( "./public/index.html");
		home.toString( "utf-8");
		
		res.header( "Cache-Control", "private");
		res.header( "Cache-Control", `max-age=${ 60 * 60 * 24 * 30}`);	// seconds of month
		res.setHeader( "Content-Type", "text/html");
		res.flushHeaders();
		res.end( home);
	} catch( err) {
		console.error( err);
	}
});

let timer;
let c = 0;

app.get( "/notify-sms", ( req, res) => {
	try {
		c++;
		clearTimeout( timer);
		timer = undefined;

		const numbers = [ "09396941726"];

		timer = setTimeout( () => {
			c = 0;
		}, 1000 * 60 * 60);

		const data = {
			username: "09104248854",
			password: "Lincer!1198@",
			text: [
				c.toString(),						// order num
				"یکساعت",							// duration (مدت در آینده)
				randomBytes( 4).toString( "hex"),	// discount code
				randomInt( 10, 25).toString()		// discount percentage
			].join( ";"),
			to: numbers[ c % numbers.length],
			bodyId: 200967
		};
		
		axios( {
			method: "post",
			url: "https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber",
			headers: {
				"content-type": "application/json",
				"accept": "application/json"
			},
			data
		}).then( ( response) => {
			if( response.status !== 200)
				throw response.data;

			const { Value, RetStatus, StrRetStatus} = response.data;

			if( RetStatus !== 1)
				throw new Error( `SMS Send Failed: { Value: ${ Value}, RetStatus: ${ RetStatus}, StrRetStatus: ${ StrRetStatus}}`);

			res.end();
		}).catch( err => {
			throw err;
		});
	} catch( err) {
		console.error( err);
	}
});

const server = createServer( app);

const port = 2020;

server.listen( port, () => {
	console.log( `Server Running @ ${ port}`);
})